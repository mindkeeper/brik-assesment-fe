import { Button, Form, Input, message } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/reducers/authQuery";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./_Layout";

export default function Register() {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [step, setStep] = useState(1);
  const [submittable1, setSubmittable1] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();
  useEffect(() => {
    if (step === 1) {
      form
        .validateFields(["email", "username", "password", "confirm"], {
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable1(true);
          },
          () => {
            setSubmittable1(false);
          }
        );
    }
    if (step === 2) {
      form.validateFields({ validateOnly: true }).then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
    }
  }, [step, form, values]);

  const nextHandler = useCallback(() => {
    setStep((step) => step + 1);
  }, []);

  const prevHandler = useCallback(() => {
    setStep((step) => step - 1);
  }, []);

  const submitHandler = useCallback(
    (values) => {
      register(values);
    },
    [register]
  );
  const navigate = useNavigate();
  console.log(isSuccess);
  useEffect(() => {
    if (isSuccess) {
      message.success("Berhasil daftar, silakan masuk.");
      navigate("/login");
    }
  }, [isSuccess, navigate]);
  return (
    <Layout>
      <Form
        form={form}
        onFinish={submitHandler}
        layout="vertical"
        className="bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-md w-[90vw] max-w-[400px] shadow-md overflow-auto max-h-[calc(100vh-8rem-40px)]"
      >
        <div className={clsx(step !== 1 ? "hidden" : "")}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email wajib diisi" },
              {
                type: "email",
                message: "Email tidak sesuai",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Username wajib diisi" },
              { min: 6, message: "Username harus terdiri dari 6-20 karakter" },
              { max: 20, message: "Username harus terdiri dari 6-20 karakter" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kata sandi"
            name="password"
            rules={[
              { required: true, message: "Kata sandi wajib diisi" },
              { min: 6, message: "Kata sandi harus 6-20 karakter" },
              { max: 20, message: "Kata sandi harus 6-20 karakter" },
              {
                pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
                message: "kata sandi harus memiliki kombinasi angka dan huruf",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Konfirmasi Kata sandi"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Konfirmasi kata sandi wajib diisi" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Kata sandi tidak sesuai"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="m-0">
            <Button
              disabled={!submittable1}
              onClick={nextHandler}
              className="w-full sm:w-fit flex gap-1 items-center justify-center bg-gray-900 text-white hover:text-gray-900 hover:bg-white delay-100"
            >
              Selanjutnya
            </Button>
            <p>
              Sudah punya akun?{" "}
              <Link to="/login" className="text-[#00aeef]">
                Masuk di sini.
              </Link>
            </p>
          </Form.Item>
        </div>
        <div className={clsx(step !== 2 ? "hidden" : "")}>
          <Form.Item
            label="Nama Depan"
            name="first_name"
            rules={[{ required: true, message: "Nama depan wajib diisi" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nama Belakang"
            name="last_name"
            rules={[{ required: true, message: "Nama depan wajib diisi" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="m-0">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={prevHandler}
                className="w-full sm:w-fit flex gap-1 items-center justify-center"
              >
                Kembali
              </Button>
              <Button
                htmlType="submit"
                disabled={step !== 2 || !submittable}
                loading={isLoading}
                className="w-full sm:w-fi bg-gray-900 text-white hover:text-gray-900 hover:bg-white delay-100t"
              >
                Submit
              </Button>
              {error && <p className="text-red-500">{error.message}</p>}
            </div>
            <p>
              Sudah punya akun?{" "}
              <Link to="/login" className="text-[#00aeef]">
                Masuk di sini.
              </Link>
            </p>
          </Form.Item>
        </div>
      </Form>
    </Layout>
  );
}
