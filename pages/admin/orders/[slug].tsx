import type { NextPageWithLayout } from "../../_app";
import OrderDetailsView from "components/views/admin/orders/[slug]";
import route_paths from "paths";
import BreadcrumbElement from "components/elements/breadcrumb/Breadcrumb";
const pages = [
    {
        path: route_paths.admin_orders,
        title: "الطلبات"
    }, {
        title: "تفاصيل الطلب"
    }
]
const AdminOrderDetailsPage: NextPageWithLayout = () => {
    return <>
        <BreadcrumbElement page={pages} />
        <OrderDetailsView />
    </>;
};
AdminOrderDetailsPage.layout = "Admin";
export default AdminOrderDetailsPage;
