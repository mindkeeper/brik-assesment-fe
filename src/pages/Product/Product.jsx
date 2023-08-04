import React, { useCallback, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useGetProductListQuery } from "../../redux/reducers/productQuery";
import { Alert, Button, Empty, Input, Pagination, Select } from "antd";
import { useGetCategoriesQuery } from "../../redux/reducers/categoryQuery";
import Card from "../../components/Card";
import ProductModal from "../../components/modal/ProductModal";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../redux/reducers/userQuery";
import AddProduct from "../admin/AddProduct";

export default function Product() {
  const [searchParams, setSearchParams] = useState({
    name: null,
    limit: 10,
    page: 1,
    sort: "newest",
    category_id: "",
  });

  const debounceSearchQuery = useDebounce(searchParams.name, 500);
  const {
    error,
    isFetching,
    refetch,
    data: products,
  } = useGetProductListQuery({
    name: debounceSearchQuery,
    category_id: searchParams.category_id ?? "",
    sort: searchParams.sort ?? "newest",
    page: searchParams.page,
    limit: searchParams.limit,
  });

  const {
    error: errorCatgory,
    isFetching: isFetchingCategory,
    data: categoriesData,
    refetch: refetchCategory,
  } = useGetCategoriesQuery();

  const changeParamsHandler = useCallback((param, value) => {
    setSearchParams((prev) => ({ ...prev, [param]: value }));
  }, []);

  const changeLimitHandler = (current, pageSize) =>
    changeParamsHandler("limit", pageSize);

  const changePageHandler = (page) => changeParamsHandler("page", page);
  const categories = useMemo(
    () =>
      categoriesData?.data
        ? [
            {
              label: "Pilih Kategori",
              value: "",
            },
            ...categoriesData.data.map((item) => ({
              label: item.name,
              value: item.id,
            })),
          ]
        : [],
    [categoriesData?.data]
  );

  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalAdmin, setOpenModalAdmin] = useState(false);
  const toggleModal = useCallback(
    (id) => {
      if (openModal) {
        setSelectedId(null);
      } else {
        setSelectedId(id);
      }
      setOpenModal((modal) => !modal);
    },
    [openModal]
  );

  const { token } = useSelector((state) => state.auth);
  const { data: userData } = useGetUserQuery(token);
  const userRole = useMemo(() => {
    if (userData && userData.data) {
      return userData.data.role;
    }
    return null;
  }, [userData]);

  const toggleAdminModal = useCallback(() => {
    setOpenModalAdmin((prev) => !prev);
  }, []);
  return (
    <section className="w-full px-[5%] sm:px-[10%] py-6 flex flex-col">
      <main className="flex-1 w-full max-w-[1200px] mx-auto flex flex-col gap-4">
        {error && !isFetching && (
          <Alert
            message={
              <>
                Gagal menarik data,{" "}
                <div onClick={refetch}>klik untuk refresh.</div>
              </>
            }
            type="error"
            className="mb-3"
            showIcon
            closable
          />
        )}
        {errorCatgory && !isFetchingCategory && (
          <Alert
            message={
              <>
                Gagal menarik kategori,{" "}
                <div onClick={refetchCategory}>klik untuk refresh.</div>
              </>
            }
            type="error"
            className="mb-3"
            showIcon
            closable
          />
        )}
        <h1 className="text-3xl font-bold capitalize m-0">List Produk</h1>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Input.Search
              placeholder="Cari produk"
              onChange={(e) => changeParamsHandler("name", e.target.value)}
              className="max-w-[480px]"
              size="large"
              allowClear
            />
            <Select
              defaultValue="newest"
              onChange={(value) => changeParamsHandler("sort", value)}
              options={[
                { value: "newest", label: "Paling baru" },
                { value: "oldest", label: "Paling lama" },
                { value: "cheapest", label: "Termurah" },
                { value: "priciest", label: "Termahal" },
              ]}
              size="large"
              className="w-fit"
            />
            <Select
              defaultValue=""
              onChange={(value) => changeParamsHandler("category_id", value)}
              options={categories}
              size="large"
              className="w-fit"
            />
          </div>
          {userRole && userRole === "Admin" && (
            <div>
              <Button onClick={toggleAdminModal}>Buat Produk Baru</Button>
              <AddProduct
                isOpenModal={openModalAdmin}
                toggle={toggleAdminModal}
              />
            </div>
          )}
        </div>
        {isFetching ? (
          <div className="grid grid-cols-[repeat(2,_1fr)] md:grid-cols-[repeat(3,_1fr)] xl:grid-cols-[repeat(4,_1fr)] gap-4">
            {[...Array(4)].map((_, index) => (
              <Card key={index} loading />
            ))}
          </div>
        ) : products && products?.data?.length > 0 ? (
          <div className="grid grid-cols-[repeat(2,_1fr)] md:grid-cols-[repeat(3,_1fr)] xl:grid-cols-[repeat(4,_1fr)] gap-4">
            {products?.data?.map((product, index) => (
              <div
                key={index}
                onClick={() => {
                  toggleModal(product.id);
                }}
                className="cursor-pointer"
              >
                <Card data={product} />
              </div>
            ))}
            {selectedId && (
              <ProductModal
                toggleModal={toggleModal}
                openModal={openModal}
                productId={selectedId}
              />
            )}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="self-center" />
        )}
        {products && products?.pagination && (
          <Pagination
            total={products?.pagination?.total_data ?? 0}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            showSizeChanger
            defaultPageSize={searchParams.limit}
            defaultCurrent={searchParams.page}
            className="w-fit ml-auto mt-auto"
            onChange={changePageHandler}
            onShowSizeChange={changeLimitHandler}
          />
        )}
      </main>
    </section>
  );
}
