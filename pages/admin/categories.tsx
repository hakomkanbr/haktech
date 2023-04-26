import type { NextPageWithLayout } from "../_app";
import CategoryView from "components/views/admin/categories/categories";
import BreadcrumbElement from "components/elements/breadcrumb/Breadcrumb";

const pages = [
  {
    title: "الأقسام"
  }
]

const AdminCategoriesPage: NextPageWithLayout = () => {
  return (
    <>
      <BreadcrumbElement page={pages} />
      <CategoryView />
    </>
  );
};
AdminCategoriesPage.layout = "Admin";
export default AdminCategoriesPage;
