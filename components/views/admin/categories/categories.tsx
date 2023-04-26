import CardComponent from "components/elements/card/card";
import TableBasic from "../../../elements/table/table";
import points from "points";
import CreateEditCategoryView from "./add-update-category";
import ColumnEnum from "../../../../enums/columns.enum";
import React, { useState, useCallback } from "react";
import CollectionCreateForm from "components/elements/modal/modal-create-edit";
import { updateDatatableSetting } from "../../../../redux/app/reducer";
import axiosConfig from "services/api";
import slugGenerator from "helpers/slug-generator";
import { useDispatch } from "react-redux";
import FilterCategories from "./filtere";
import { AppstoreOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "الاسم",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "عدد المنتجات",
    dataIndex: "productCount",
    key: "productCount",
  },
  {
    title: "حالة النشر",
    type: ColumnEnum.switch,
    dataIndex: "published",
  },
  {
    type: ColumnEnum.actions,
    width: 30,
    editInModal: points.postCategory,
    modalTitle: "تعديل القسم",
    deleteItemUrl: points.deleteCategory,
    Component: CreateEditCategoryView,
    dataIndex: "id",
  },
];

const CategoriesView: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onFinish = useCallback(async (values: any) => {
    values.slug = slugGenerator(values.name || values.title);
    await (
      await axiosConfig().post(points.postCategory ?? "", { ...values })
    ).data;
    setOpen(false);
    dispatch(updateDatatableSetting({}));
    return Promise.resolve(true);
  }, []);
  return (
    <>
      {" "}
      <CardComponent
        title={<>
          <AppstoreOutlined style={{ margin: "0 0 0 5px" }} />
          كل الأقسام
        </>}
        extra={
          <>
            <a className="btn ant-btn-success" onClick={() => setOpen(true)}>
              قسم جديد +
            </a>
          </>
        }
      >
        <FilterCategories />
        <TableBasic url={points.getCategories} columns={columns} />
        <CollectionCreateForm
          title={"أنشأ قسم جديد"}
          open={open}
          loading={false}
          onCreate={onFinish}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <CreateEditCategoryView />
        </CollectionCreateForm>
      </CardComponent>
    </>
  );
};

export default CategoriesView;
