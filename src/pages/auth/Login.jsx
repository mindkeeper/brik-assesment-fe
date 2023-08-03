import { Button, Form, Input, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/auth";
import Layout from "./_Layout";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { isLoading, error, isSuccess } = useSelector((state) => state.auth);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = useCallback(
    (values) => {
      dispatch(loginAction(values));
    },
    [dispatch]
  );
  useEffect(() => {
    if (isSuccess) {
      message.success("Berhasil masuk.");
      navigate("/");
    }
  }, [isSuccess, navigate]);
  return (
    <Layout>
      <Form
        form={form}
        onFinish={submitHandler}
        layout="vertical"
        className="bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-md w-[90vw] max-w-[400px] shadow-md overflow-hidden"
      >
        <Form.Item
          label="Email atau username"
          name="email_or_username"
          rules={[
            { required: true, message: "Email atau username wajib diisi" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kata sandi"
          name="password"
          rules={[{ required: true, message: "Password wajib diisi" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="m-0">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              htmlType="submit"
              disabled={!submittable || isLoading}
              loading={isLoading}
              className="w-full sm:w-fit bg-gray-900 text-white hover:text-gray-900 hover:bg-white delay-100"
            >
              Masuk
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
          </div>
          <p>
            Atau{" "}
            <Link to="/register" className="text-[#00aeef]">
              daftar di sini.
            </Link>
          </p>
        </Form.Item>
      </Form>
    </Layout>
  );
}
