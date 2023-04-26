import CardComponent from "components/elements/card/card";
import TableBasic from "../../../elements/table/table";
import points from "points";
import Link from "next/link";
import router_path from "paths";
import ColumnEnum from "../../../../enums/columns.enum";

const columns = [
  {
    title: "الاسم",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "الحالة",
    type: ColumnEnum.switch,
    isTrue: "فعال",
    url: points.ChaneActiveCompanies,
    dataIndex: "activate",
  },
  {
    title: "عدد المنتجات",
    dataIndex: "productCount",
  },
  {
    title: "عدد الأقسام",
    dataIndex: "categoryCount",
  },
  {
    title: "عدد المستخدمين",
    dataIndex: "categoryCount",
  },
  {
    type: ColumnEnum.actions,
    deleteItemUrl: points.deleteCompanies,
    editpath: router_path.master_edit_company,
    width: 30,
    dataIndex: "id",
  },
];

const companiesView: React.FC = () => {
  return (
    <>
      {" "}
      <CardComponent
        title="كل الشركات"
        extra={
          <>
            <Link href={router_path.master_add_company}>
              <a className="btn ant-btn-success">شركة جديد +</a>
            </Link>
          </>
        }
      >
        <TableBasic url={points.getCompanies} columns={columns} />
      </CardComponent>
    </>
  );
};

export default companiesView;
