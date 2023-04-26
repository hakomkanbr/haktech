import CardComponent from "components/elements/card/card";
import TableBasic from "components/elements/table/table";
import Link from "next/link";
import points from "points";
import { useDispatch } from "react-redux";
import FilterContent from "./filtere";
import ColumnEnum from "enums/columns.enum";
import { ColumnsType } from "antd/es/table";
import router_path from "paths";
import { Button } from "antd";

const columns = [
  {
    width: 25,
    title: "الصورة الرئيسية",
    dataIndex: "mainImageName",
    type: ColumnEnum.image,
  },
  // {
  //   width: 50,
  //   title: "ألبوم الصور",
  //   dataIndex: "imageNames",
  //   type: ColumnEnum.groupImage,
  // },
  {
    title: "اسم المنتج",
    dataIndex: "title",
  },
  {
    title: "وصف المنتج",
    dataIndex: "description",
  },
  {
    title: "الحالة",
    url: points.changeStateProduct,
    type: ColumnEnum.switch,
    dataIndex: "published",
  },
  {
    type: ColumnEnum.actions,
    deleteItemUrl: points.deleteproducts,
    editpath: router_path.admin_edit_products,
    width: 30,
    dataIndex: "id",
  },
];

const ProdcutsView = () => {
  return (
    <CardComponent
      title="كل المنتجات"
      extra={
        <>
          <Link href="/admin/products/add">
            <Button type="primary">منتج جديد +</Button>
          </Link>
        </>
      }
    >
      <FilterContent />
      {/* <TableTabs /> */}
      <TableBasic url={points.getproducts} columns={columns} />
    </CardComponent>
  );
};
export default ProdcutsView;
