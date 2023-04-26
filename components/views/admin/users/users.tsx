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
    url: points.changeStateUser,
    dataIndex: "activate",
  },
  {
    title: "الأيميل",
    dataIndex: "email",
  },
  {
    title: "رقم التلفون",
    dataIndex: "phoneNumber",
  },
  {
    type: ColumnEnum.actions,
    deleteItemUrl: points.deleteUser,
    editpath: router_path.admin_edit_user,
    width: 30,
    dataIndex: "id",
  },
];

const UsersView: React.FC = () => {
  return (
    <>
      {" "}
      <CardComponent
        title="كل المستخدمين"
        extra={
          <>
            <Link href={router_path.admin_add_users}>
              <a className="btn ant-btn-success">مستخدم جديد +</a>
            </Link>
          </>
        }
      >
        <TableBasic url={points.getUsers} columns={columns} />
      </CardComponent>
    </>
  );
};

export default UsersView;
