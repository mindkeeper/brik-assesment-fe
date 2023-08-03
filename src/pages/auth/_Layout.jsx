import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";

export default function Layout({ children }) {
  return <AuthLayout>{children}</AuthLayout>;
}
