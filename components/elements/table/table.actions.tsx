import { Dropdown, Menu } from "antd";
import axiosConfig from "../../../services/api";
import { useDispatch } from "react-redux";
import { updateDatatableSetting } from "../../../redux/app/reducer";
import Link from "next/link";
import { TbSettings } from "react-icons/tb";
import React, { useCallback, useState } from "react";
import CollectionCreateForm from "../modal/modal-create-edit";
import slugGenerator from "helpers/slug-generator";
import { EyeOutlined } from "@ant-design/icons";

interface PropsActions {
  deleteItemUrl: string;
  editPath: string;
  id: number;
  editInModal?: string | undefined;
  detayPath?: string | undefined;
  component: React.ElementType;
  modalTitle: string;
  full: object;
}

const MenuBtn = ({
  deleteItemUrl,
  id,
  full,
  editPath,
  editInModal,
  component: Component,
  modalTitle,
}: PropsActions) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteItem = useCallback(async () => {
    await axiosConfig().delete(deleteItemUrl, {
      data: {
        ids: [id],
      },
    });
    dispatch(updateDatatableSetting({}));
  }, []);
  const onFinish = useCallback(async (values: any) => {
    setLoading(true);
    values.slug = slugGenerator(values.name || values.title);
    values.id = id;
    try {
      await (
        await axiosConfig().post(editInModal ?? "", { ...values })
      ).data;
      setOpen(false);
      dispatch(updateDatatableSetting({}));

    } catch (err) {
    } finally {
      setLoading(false);
    }
    return Promise.resolve(true);
  }, []);
  return (
    <Menu>
      {editPath && (
        <Menu.Item>
          <Link href={`${editPath}?id=${id}`}>تعديل</Link>
        </Menu.Item>
      )}
      {editInModal && (
        <>
          <Menu.Item onClick={() => setOpen(true)}>تعديل</Menu.Item>
          <CollectionCreateForm
            data={full}
            loading={loading}
            title={modalTitle}
            open={open}
            onCreate={onFinish}
            onCancel={() => {
              setOpen(false);
            }}
          >
            <Component />
          </CollectionCreateForm>
        </>
      )}
      {deleteItemUrl && <Menu.Item onClick={deleteItem}>مسح</Menu.Item>}
    </Menu>
  );
};

const TableActions = ({
  editInModal,
  deleteItemUrl,
  id,
  detayPath,
  editPath,
  component: Component,
  modalTitle,
  full,
}: PropsActions) => {
  return (
    <>
      {detayPath ? (
        <Link href={detayPath + "?id=" + id}>
          <a style={{ margin: "0 5px", position: "relative", top: -2 }}>
            <EyeOutlined />
          </a>
        </Link>
      ) : ""}
      <Dropdown
        overlay={
          <MenuBtn
            full={full}
            modalTitle={modalTitle}
            component={Component}
            editPath={editPath}
            editInModal={editInModal}
            deleteItemUrl={deleteItemUrl}
            id={id}
          />
        }
      >
        <TbSettings style={{ cursor: "pointer" }} />
      </Dropdown>
    </>
  );
};

export default TableActions;
