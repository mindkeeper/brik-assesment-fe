import React, { useCallback, useState } from "react";
import { useGetProductListQuery } from "../../redux/reducers/productQuery";
import { Link } from "react-router-dom";
import { Alert, Empty } from "antd";
import clsx from "clsx";
import Card from "../Card";
import ProductModal from "../modal/ProductModal";

export default function OurProducts() {
  const {
    data: products,
    isSuccess,
    isFetching,
    error,
    refetch,
  } = useGetProductListQuery({
    limit: 4,
    sort: "newest",
  });
  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
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
  return (
    <section className="w-full px-[3%] sm:px-[6%] py-4">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl text-center font-bold">LIST PRODUK</h2>
      </div>
      <div className="mb-4">
        <div className="flex flex-row-reverse items-center">
          <Link to="/products" className="font-semibold mb-2">
            Lebih banyak{" >"}
          </Link>
        </div>
        {error && !isFetching && (
          <Alert
            type="error"
            className="mb-3"
            showIcon
            closable
            message={
              <>
                Gagal memuat produk,{" "}
                <Link onClick={refetch}>Klik untuk merefresh</Link>
              </>
            }
          />
        )}
        <div
          className={clsx(
            error || products?.data?.length < 1
              ? "flex justify-center"
              : "grid grid-cols-[repeat(2,_1fr)] md:grid-cols-[repeat(3,_1fr)] xl:grid-cols-[repeat(4,_1fr)] gap-4"
          )}
        >
          {isFetching ? (
            [...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className={clsx(
                  idx === 2 ? "hidden" : "md:inline",
                  idx === 3 ? "hidden" : "xl:inline"
                )}
              >
                <Card loading />
              </div>
            ))
          ) : isSuccess && products?.data?.length > 0 ? (
            products?.data?.map((product, idx) => (
              <div
                onClick={() => {
                  toggleModal(product.id);
                }}
                key={idx}
                className={clsx(
                  idx === 2 ? "hidden" : "md:inline",
                  idx === 3 ? "hidden" : "xl:inline",
                  "cursor-pointer"
                )}
              >
                <Card data={product} />
              </div>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          {selectedId && (
            <ProductModal
              productId={selectedId}
              toggleModal={toggleModal}
              openModal={openModal}
            />
          )}
        </div>
      </div>
    </section>
  );
}
