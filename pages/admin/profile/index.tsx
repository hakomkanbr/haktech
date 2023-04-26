import CategoryView from "components/views/admin/categories/categories";
import BreadcrumbElement from "components/elements/breadcrumb/Breadcrumb";
import { NextPageWithLayout } from "pages/_app";
import AccontSettingView from "components/views/admin/profile";

const pages = [
    {
        title: "الملف الشخصي"
    }
]

const AdminAccountSettingPage: NextPageWithLayout = () => {
    return (
        <>
            <BreadcrumbElement page={pages} />
            <AccontSettingView />
        </>
    );
};
AdminAccountSettingPage.layout = "Admin";
export default AdminAccountSettingPage;
