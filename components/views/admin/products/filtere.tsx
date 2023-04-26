import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { updateDatatableSetting } from "../../../../redux/app/reducer";
import { useCallback, useState } from "react";
import DebounceSelect from "components/elements/select/select-fetch";
import SelectDataType from "types/select";
import fetchCategoryList from "helpers/fetchCategories";
import dayjs from 'dayjs';



const { RangePicker } = DatePicker;

export default function FilterContent() {
  const [categoryId, setCategoryId] = useState<SelectDataType[]>([]);
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    if (values.rangeDate) {
      values.minDate = values.rangeDate[0] ?? "";
      values.maxDate = values.rangeDate[1] ?? "";
    }
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
            <Form.Item name="categoryId">
              <DebounceSelect
                style={{
                  width: "100%",
                }}
                allowClear={true}
                value={categoryId}
                onChange={(newValue) => {
                  setCategoryId(newValue as SelectDataType[]);
                }}
                fetchOptions={fetchCategoryList}
              />
            </Form.Item>
          </Col>
          <Col sm={6}>
            <Form.Item name="rangeDate">
              <RangePicker
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />
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
