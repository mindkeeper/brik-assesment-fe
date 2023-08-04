import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Upload,
  message,
} from "antd";
import { IoAdd } from "react-icons/io5";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddProductMutation } from "../../redux/reducers/productQuery";

export default function AddProduct({ isOpenModal, toggle }) {
  const { token } = useSelector((state) => state.auth);
  const [addProduct, { isSuccess, error, reset, isLoading }] =
    useAddProductMutation();

  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);
  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      (e) => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  const submitHandler = useCallback(
    (values) => {
      const body = new FormData();
      body.append("name", values.name);
      body.append("price", JSON.stringify(values.price));
      body.append("description", values.description);
      body.append("sku", values.sku);
      body.append("weight", JSON.stringify(values.weight));
      body.append("width", JSON.stringify(values.width));
      body.append("height", JSON.stringify(values.height));
      body.append("length", JSON.stringify(values.length));
      body.append("category_id", values.category);
      values?.image?.forEach((image) => body.append("image", image));

      addProduct({ token, formData: true, data: body });
    },
    [addProduct, token]
  );

  useEffect(() => {
    if (isOpenModal && isSuccess) {
      message.success("Berhasil menambah produk.");
      setTimeout(() => {
        form.resetFields();
        reset();
        toggle();
      }, 500);
    }
  }, [isSuccess, form, isOpenModal, reset, toggle]);
  const normFile = useCallback((e) => {
    if (Array.isArray(e)) {
      return e?.map((file) => file.originFileObj);
    }
    return e?.fileList?.map((file) => file.originFileObj);
  }, []);

  return (
    <Modal
      title="Tambah Produk"
      open={isOpenModal}
      onCancel={toggle}
      footer={null}
    >
      <Form form={form} onFinish={submitHandler} layout="vertical">
        {/* nama */}
        <Form.Item
          label="Nama Produk"
          name="name"
          rules={[{ required: true, message: "Nama produk wajib diisi" }]}
        >
          <Input />
        </Form.Item>

        {/* harga */}
        <Form.Item
          label="Harga Produk"
          name="price"
          rules={[{ required: true, message: "Harga Produk wajib diisi" }]}
        >
          <InputNumber
            addonBefore="Rp."
            className="w-full"
            step={500}
            min={1}
          />
        </Form.Item>

        {/* sku */}
        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: "sku produk wajib diisi" }]}
        >
          <Input className="w-full" />
        </Form.Item>
        {/* kategori dan image */}
        <div className="flex flex-col xl:flex-row xl:justify-start xl:gap-2">
          <Form.Item
            label="Kategori Produk"
            name="category"
            rules={[
              { required: true, message: "kategori produk wajib dipilih" },
            ]}
            className="flex-1"
          >
            <Radio.Group>
              <Radio.Button value={1}>Snack</Radio.Button>
              <Radio.Button value={2}>Drink</Radio.Button>
              <Radio.Button value={3}>Candy</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Upload Gambar"
            name="image"
            valuePropName="image"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Upload gambar minimal 1" }]}
            className="flex-1"
          >
            <Upload
              accept="image/png, image/jpg, image/jpeg, image/webp"
              maxCount={1}
              showUploadList={true}
              customRequest={({ onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
            >
              <Button className="flex gap-2 items-center">
                <IoAdd />
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </div>

        <div className="flex flex-col xl:flex-row xl:justify-start xl:gap-2">
          <Form.Item
            label="Berat Produk"
            name="weight"
            rules={[{ required: true, message: "Berat Produk wajib diisi" }]}
            className="flex-1"
          >
            <InputNumber
              addonAfter="gram"
              className="w-full"
              step={10}
              min={1}
            />
          </Form.Item>
          <Form.Item
            label="Lebar Produk"
            name="width"
            rules={[{ required: true, message: "Lebar Produk wajib diisi" }]}
            className="flex-1"
          >
            <InputNumber addonAfter="cm" className="w-full" min={1} />
          </Form.Item>
        </div>

        <div className="flex flex-col xl:flex-row xl:justify-start xl:gap-2">
          <Form.Item
            label="Panjang Produk"
            name="length"
            rules={[{ required: true, message: "Panjang Produk wajib diisi" }]}
            className="flex-1"
          >
            <InputNumber addonAfter="cm" className="w-full" min={1} />
          </Form.Item>
          <Form.Item
            label="Tinggi Produk"
            name="height"
            rules={[{ required: true, message: "Tinggi Produk wajib diisi" }]}
            className="flex-1"
          >
            <InputNumber addonAfter="cm" className="w-full" min={1} />
          </Form.Item>
        </div>

        <Form.Item
          label="Deskripsi"
          name="description"
          rules={[{ required: true, message: "Deskripsi produk wajib diisi" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item className="m-0">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              htmlType="submit"
              disabled={!submittable || isLoading}
              loading={isLoading}
              className="w-full sm:w-fit bg-gray-900 text-white hover:bg-gray-100 hover:text-black delay-100"
            >
              Simpan
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
