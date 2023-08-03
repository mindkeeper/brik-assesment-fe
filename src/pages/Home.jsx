import { Layout } from "antd";
import React from "react";
import Hero from "../components/home/Hero";
import OurProducts from "../components/home/OurProducts";

export default function Home() {
  return (
    <Layout.Content className="flex flex-col">
      <Hero />
      <OurProducts />
    </Layout.Content>
  );
}
