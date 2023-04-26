import { Form, Input, Select } from "antd";

export default function CreateEditCategoryView() {
  return (
    <>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
          },
          {
            min: 3,
          },
        ]}
        label="أسم القسم"
      >
        <Input placeholder="أسم القسم" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            min: 3,
          },
        ]}
        label="وصف القسم"
      >
        <Input placeholder="أسم القسم" />
      </Form.Item>
      <Form.Item rules={[
        {
          required: true,
        }
      ]} label="حالة النشر" name="published">
        <Select placeholder="النشر">
          <Select.Option value={true}>منشور</Select.Option>
          <Select.Option value={false}> غير منشور</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
