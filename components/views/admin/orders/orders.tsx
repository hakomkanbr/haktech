import CardComponent from "components/elements/card/card";
import TableBasic from "../../../elements/table/table";
import points from "points";
import React from "react";
import FilterOrder from "./filtere";
import { currencyFormatter } from "helpers/money-formet";
import orderStateData from "enums/order-state";
import ColumnEnum from "enums/columns.enum";
import route_paths from "paths";
import { PayCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";


const columns = [
  {
    title: "كود الطلبية",
    dataIndex: "code",
    render: (data: any, full: any) => {
      return `#${data}`
    }
  },
  {
    title: "المستخدم",
    dataIndex: "name",
  },
  {
    title: "عدد المنتجات",
    dataIndex: "productCount",
  },
  {
    title: "طريقة الدفع",
    dataIndex: "payMethod",
  },
  {
    title: "مجموع السعر",
    dataIndex: "price",
    render: (data: any, full: any) => {
      return currencyFormatter(data);
    }
  },
  {
    title: "الحالة",
    dataIndex: "state",
    render: (data: any, full: any) => {
      var a: any = orderStateData.filter((i) => i.value == data.toLowerCase());
      console.info("a : ", a);
      if (a.length) {
        return <Tag color="success">{a[0].label}</Tag>;
      }
      return ""
    }
  },
  {
    dataIndex: "id",
    width: 100,
    detayPath: route_paths.admin_orders_detay,
    type: ColumnEnum.actions
  },
];

const AdminOrdersView: React.FC = () => {
  return (
    <>
      {" "}
      <CardComponent
        title={<>
          الطلبات
        </>}
      >
        <FilterOrder />
        <TableBasic url={points.getOrders} columns={columns} />
      </CardComponent>
    </>
  );
};

export default AdminOrdersView;
