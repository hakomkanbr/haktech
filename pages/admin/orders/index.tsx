import BreadcrumbElement from "components/elements/breadcrumb/Breadcrumb";
import AdminOrdersView from "components/views/admin/orders/orders";
import { NextPageWithLayout } from "pages/_app";
import route_paths from "paths";
const pages = [
    {
        path: route_paths.admin_orders,
        title: "الطلبات"
    }
]
const AdminOrdersPage: NextPageWithLayout = () => {
    return (
        <>
            <BreadcrumbElement page={pages} />
            <AdminOrdersView />
        </>
    );
};
AdminOrdersPage.layout = "Admin";
export default AdminOrdersPage;
