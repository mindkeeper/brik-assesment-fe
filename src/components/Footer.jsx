import { Divider, Layout } from "antd";
import React from "react";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <Layout.Footer className="bg-gray-900 text-white border-t border-t-gray-300 dark:border-t-gray-600">
      <div className="flex flex-col gap-4 items-center">
        <Link href="/" className="h-8 hover:animate-pulse">
          <img src={logo} alt="logo" className="w-8 h-8" />
        </Link>
      </div>
      <div className="mx-auto max-w-[400px]">
        <Divider className="bg-gray-600" />
      </div>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-center">Jl. lorem ipsum no 123</p>
          <p className="text-center">
            <Link
              href="yourklontong@mail.com"
              className="flex gap-1 items-center"
            >
              <MdOutlineEmail /> yourklontong@mail.com
            </Link>
          </p>
          <p className="text-center">
            <Link href="tel:+6281234567890" className="flex gap-1 items-center">
              <MdPhone /> +62 812 3456 7890
            </Link>
          </p>
        </div>
        <p className="text-gray-400">© 2023 Klontong</p>
      </div>
    </Layout.Footer>
  );
}
