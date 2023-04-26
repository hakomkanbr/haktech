import type { NextPageWithLayout } from "../../_app";
import ProdcutsView from "../../../components/views/admin/products/index";
import BreadcrumbElement from "components/elements/breadcrumb/Breadcrumb";
const pages = [
  {
    title: "المنتجات"
  }
]
const Page: NextPageWithLayout = () => {
  return (
    <>
      <BreadcrumbElement page={pages} />
      <ProdcutsView />
    </>
  );
};
Page.layout = "Admin";
export default Page;
