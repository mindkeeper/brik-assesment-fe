import { Layout } from "antd";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AuthCarousel from "./_AuthCarousel";
import { useGetUserQuery } from "../../redux/reducers/userQuery";

export default function AuthLayout({ children }) {
  const { token } = useSelector((state) => state.auth);
  const { data: userData } = useGetUserQuery(token);
  const userRole = useMemo(() => {
    if (userData && userData.data) {
      return userData.data.role;
    }
    return null;
  }, [userData]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      if (userRole && userRole === "Admin") {
        navigate("/products");
      } else {
        navigate("/");
      }
    }
  }, [token, navigate, userRole]);

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
