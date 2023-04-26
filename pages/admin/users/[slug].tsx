import type { NextPageWithLayout } from "../../_app";
import CreateEditUserView from "components/views/admin/users/[slug]";
import { useEffect } from "react";

const Page: NextPageWithLayout = () => {

  return <CreateEditUserView />;
};
Page.layout = "Admin";
export default Page;
