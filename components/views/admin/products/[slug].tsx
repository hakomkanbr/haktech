import CardComponent from "components/elements/card/card";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import UploadImage from "../../../elements/upload/upload-single";
import axiosConfig from "../../../../services/api";
import points from "points";
import router_path from "paths";
import EditorTinymce from "../../../elements/Editor/editor";
import FlexDiv from "components/utils/flex-div";
import { useRouter } from "next/router";
import moment from "moment";
import Link from "next/link";
import PlacesEnum from "enums/file.enum";
import slugGenerator from "helpers/slug-generator";
import { useCallback, useEffect, useState } from "react";
import DebounceSelect from "components/elements/select/select-fetch";
import SelectDataType from "types/select";
import fetchCategoryList from "helpers/fetchCategories";
import InputNumberElement from "components/elements/input-number/input-number";
const { Option } = Select;

export default function CreateEditProductView() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<SelectDataType[]>([]);
  const [oldImageNames, setOldImageNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = useCallback(async (values: any) => {
    try {
      setLoading(true);
      values.tags = ["tag1", "tag2", "tag3"];
      values.oldImageNames = oldImageNames ?? [];
      if (typeof values.price === "object") {
        values.price = values.price?.number;
      }
      // values.price = parseInt(values.price);
      values.unit = "kg"
      values.slug = slugGenerator(values?.title);
      if (Array.isArray(values.categoryId) && values.categoryId.length > 0) {
        values.categoryId = values.categoryId[0].value;
      }
      await (
        await axiosConfig().post(points.postProducts, { ...values })
      ).data;
      router.push(router_path.admin_products);
    } catch (err) { }
    finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    if (router.query.id) {
      const getProduct = async () => {
        const { data } = await axiosConfig().get(
          points.getproduct + "?id=" + router.query?.id
        );
        data.oldImageNames && setOldImageNames(data.oldImageNames);
        form.setFieldsValue({
          ...data,
          categoryId: [{ label: data.categoryName, value: data.categoryId }],
          date: moment(data.date),
        });
      };
      getProduct();
    } else {
      form.setFieldsValue({ date: moment(new Date()), published: true });
    }
  }, []);

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col md={16}>
            <CardComponent style={{ padding: "5px 20px" }}>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                  },
                  {
                    min: 3,
                  },
                ]}
                label="عنوان المنتج"
              >
                <Input placeholder="عنوان المنتج" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                  {
                    min: 10,
                  },
                ]}
                name="description"
                label="وصف قصير للمنتج"
              >
                <Input.TextArea placeholder="وصف قصير للمنتج" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="price"
                label="سعر المنتج"
              >
                <InputNumberElement addonAfter="$" placeholder="سعر المنتج" />
              </Form.Item>
              <Form.Item name="body">
                <EditorTinymce />
              </Form.Item>
            </CardComponent>
          </Col>
          <Col md={8}>
            <CardComponent
              style={{ padding: "5px 20px" }}
            // title="معلومات النشر"
            >
              <Form.Item name="published" label="نشر">
                <Select>
                  <Option value={true}>نشر</Option>
                  <Option value={false}>عدم النشر</Option>
                </Select>
              </Form.Item>
              <Form.Item name="date" label="تاريخ النشر">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <FlexDiv
                justifyContent="space-between"
                as="div"
                bg="#f0f2f5"
                padding={[5, 15]}
              >
                <Button htmlType="submit" loading={loading} type="primary">
                  حفظ البيانات
                </Button>
                <Link href={router_path.admin_products}>
                  <Button type="text">رجوع</Button>
                </Link>
              </FlexDiv>
            </CardComponent>
            <CardComponent
              style={{ padding: "5px 20px" }}
            // title="معلومات النشر"
            >
              <Form.Item label="الأقسام" name="categoryId">
                <DebounceSelect
                  style={{
                    width: "100%",
                  }}
                  value={categoryId}
                  onChange={(newValue) => {
                    setCategoryId(newValue as SelectDataType[]);
                  }}
                  fetchOptions={fetchCategoryList}
                />
              </Form.Item>
            </CardComponent>
            <CardComponent style={{ padding: "5px 20px" }}>
              <Form.Item name="mainImageName" label="الصورة الرئيسية">
                <UploadImage form={form} module={PlacesEnum.Product} />
              </Form.Item>
              <Form.Item name="imageNames" label="البوم الصور">
                <UploadImage
                  form={form}
                  module={PlacesEnum.Product}
                  multiple={true}
                />
              </Form.Item>
            </CardComponent>
          </Col>
        </Row>
      </Form>
    </>
  );
}
