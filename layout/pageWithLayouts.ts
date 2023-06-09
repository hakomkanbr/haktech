import { NextPage } from "next";
import type { ReactElement } from "react";
import MainLayout from "./admin/index";
import AdminLayout from "./stores/index";

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout }
export type PageWithAdminLayoutType = NextPage & { layout: typeof AdminLayout }
export type PageWithLayoutType =
    | PageWithMainLayoutType
    | PageWithAdminLayoutType

export type LayoutProps = ({ children }: { children: ReactElement }) => ReactElement
export default PageWithLayoutType;