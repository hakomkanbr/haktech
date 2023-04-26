import { Button, Col, Form, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { updateDatatableSetting } from "../../../../redux/app/reducer";

export default function FilterCategories() {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(updateDatatableSetting(values));
  };
  return (
    <>
      <Form onFinish={onFinish} style={{ padding: "0 10px" }}>
        <Row gutter={12}>
          <Col sm={6}>
            <Form.Item name="published" >
              <Select placeholder="النشر" allowClear={true}>
                <Select.Option value={true}>منشور</Select.Option>
                <Select.Option value={false}> غير منشور</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col sm={6}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                بحث
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
