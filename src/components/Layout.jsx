import { Layout } from "antd";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <Layout className="min-h-screen">
      <Navbar />
      <Layout.Content>{children}</Layout.Content>
      <Footer />
    </Layout>
  );
}
