import type { NextPageWithLayout } from "../../_app";
import CreateEditProductView from "components/views/admin/products/[slug]";
import route_paths from "paths";
import BreadcrumbElement from "components/elements/breadcrumb/Breadcrumb";
const pages = [
  {
    path: route_paths.admin_products,
    title: "المنتجات"
  }, {
    title: "(أضافة/ تعديل)"
  }
]
const Page: NextPageWithLayout = () => {
  return (<>
    <BreadcrumbElement page={pages} />
    <CreateEditProductView />
  </>)
};
Page.layout = "Admin";
export default Page;
