import BreadcrumbElement from "components/elements/breadcrumb/Breadcrumb";
import Head from "next/head";
import type { ReactElement } from "react";
import Layout from "../../layout/admin/index";
import type { NextPageWithLayout } from "../_app";
const pages = [
  {
    path: "/content",
    title: "contents"
  }
]
const Page: NextPageWithLayout = () => {
  return <>
    {/* <BreadcrumbElement page={pages} /> */}
  </>;
};
Page.layout = "Admin";

export default Page;
