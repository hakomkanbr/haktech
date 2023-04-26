import type { NextPageWithLayout } from "../../_app";
import UsersView from "../../../components/views/admin/users/users";
import BreadcrumbElement from "components/elements/breadcrumb/Breadcrumb";

const pages = [
  {
    title: "المستخدمين"
  }
]

const Page: NextPageWithLayout = () => {
  return (
    <>
      <BreadcrumbElement page={pages} />
      <UsersView />
    </>
  );
};
Page.layout = "Admin";
export default Page;
