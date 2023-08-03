import React from "react";
import { Alert, Divider, Empty, Modal, Skeleton } from "antd";
import { useGetProductDetaiQuery } from "../../redux/reducers/productQuery";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import delimiterFormatter from "../../utils/delimiterFormatter";

export default function ProductModal({ toggleModal, productId, openModal }) {
  const {
    error,
    isFetching,
    data: product,
    isSuccess,
    refetch,
  } = useGetProductDetaiQuery({ productId });
  return (
    <Modal
      title="Detail Produk"
      open={openModal}
      onCancel={toggleModal}
      centered
      footer={null}
    >
      <div className="px-2 max-h-[500px] overflow-y-auto flex flex-col text-base">
        {error && !isFetching && (
          <Alert
            type="error"
            className="mb-3"
            showIcon
            closable
            message={
              <>
                Gagal memuat produk,{" "}
                <div onClick={refetch}>Klik untuk merefresh</div>
              </>
            }
          />
        )}
        {isFetching ? (
          <>
            <div className="flex w-full items-center justify-center">
              <Skeleton.Image />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton.Input size="small" />
              <Skeleton.Input size="small" />
            </div>
            <Divider className="bg-gray-600" />
            <div className="flex flex-col gap-2 shadow-lg bg-gray-100 p-2">
              <div className="flex justify-start items-start gap-4">
                <Skeleton.Input size="small" className="flex-1" />
                <Skeleton.Input size="small" className="flex-1" />
              </div>
              <div className="flex justify-start items-start gap-4">
                <Skeleton.Input size="small" className="flex-1" />
                <Skeleton.Input size="small" className="flex-1" />
              </div>
              <div className="flex justify-start items-start gap-4">
                <Skeleton.Input size="small" className="flex-1" />
                <Skeleton.Input size="small" className="flex-1" />
              </div>
            </div>
          </>
        ) : isSuccess && product ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-[120] aspect-[3] object-contain"
            />
            <div className="flex items-center justify-between">
              <h2 title={product?.name} className="font-bold text-gray-900">
                {product?.name}
              </h2>
              <span className="flex gap-2 items-center">
                <LiaMoneyBillWaveSolid className="text-[#ff6a30]" />
                <h3
                  title={`Rp ${delimiterFormatter(product?.price)}`}
                  className="font-bold text-[#ff6a30]"
                >
                  Rp {delimiterFormatter(product?.price)}
                </h3>
              </span>
            </div>
            <Divider className="bg-gray-600" />
            <div className="flex flex-col gap-2 shadow-lg bg-gray-100 p-2">
              <div className="flex justify-start items-start">
                <h3 title="description" className="font-bold flex-1">
                  Deskripsi
                </h3>
                <p className="flex-1">{product?.description}</p>
              </div>
              <div className="flex justify-start items-start">
                <h3 title="category" className="font-bold flex-1">
                  Kategori
                </h3>
                <p className="flex-1">{product?.category_name}</p>
              </div>
              <div className="flex justify-start items-start">
                <h3 title="weight" className="font-bold flex-1">
                  Berat
                </h3>
                <p className="flex-1">{product?.weight} gram</p>
              </div>
            </div>
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </Modal>
  );
}
