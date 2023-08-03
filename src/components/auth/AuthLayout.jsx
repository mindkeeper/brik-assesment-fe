import { Layout } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AuthCarousel from "./_AuthCarousel";

export default function AuthLayout({ children }) {
  const { token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Layout.Content className="relative">
      <section className="absolute flex flex-col items-center z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-bold text-[#00aeef] self-start m-0">
          {pathname === "/login" ? "Masuk." : "Daftar."}
        </h1>
        <p className="hidden sm:inline text-xl text-white self-start mb-4">
          Dan belanja sepuasnya
        </p>
        {children}
      </section>
      <AuthCarousel />
    </Layout.Content>
  );
}
