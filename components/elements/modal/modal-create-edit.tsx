import React, { useEffect } from "react";
import { Form, Modal } from "antd";
import styled from "styled-components";

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: any) => Promise<boolean>;
  onCancel: () => void;
  children: React.ReactNode;
  data?: any;
  loading: boolean;
  title: string;
}

const ModalStyle = styled(Modal)`
  .ant-modal-header{
    .ant-modal-title{
      margin-bottom:30px;
    }
  }
`;

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  loading = false,
  children,
  data,
  title,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, []);
  return (
    <ModalStyle
      open={open}
      title={title}
      confirmLoading={loading}
      okText="حفظ"
      cancelText="أغلاق"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            await onCreate(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        {children}
      </Form>
    </ModalStyle>
  );
};

export default CollectionCreateForm;
