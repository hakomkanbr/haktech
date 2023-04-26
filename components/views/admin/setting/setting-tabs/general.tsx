import CardComponent from "components/elements/card/card";
import { Alert, Col, Form, Input, Row, Select, Switch } from "antd";
import passwordValidations from "helpers/validations/password-validation";
import typesData from "data/types/types";
import InType from "types/types";
import InputNumberElement from "components/elements/input-number/input-number";
import { useEffect, useState } from "react";
import UploadImage from "components/elements/upload/upload-single";
import PlacesEnum from "enums/file.enum";
import Text from "components/utils/text";
import slugGenerator from "helpers/slug-generator";

const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('رجاء أدخل رقم هاتف صحيح'));
};

export default function GeneralSection() {
    const form = Form.useFormInstance();
    const slug = slugGenerator(Form.useWatch("name") ?? "");
    const siteType = slugGenerator("resturant");
    useEffect(() => {
        console.info("site type :", slug, siteType)
    }, []);
    return (
        <CardComponent
            title="معلومات العامة"
            style={{ padding: "5px 10px" }}
            extra={
                <>
                    <Form.Item name="published" >
                        <Switch unCheckedChildren="" checkedChildren="" />
                    </Form.Item>
                </>
            }
        >
            <Row gutter={[16, 16]}>
                <Col sm={{ span: 12 }}>
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
                        label="أسم الشركة"
                    >
                        <Input.TextArea placeholder="أسم الشركة" />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 12 }}>
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
                        label="وصف قصير للشركة"
                    >
                        <Input.TextArea placeholder="وصف قصير للشركة" />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 24 }}>
                    <Alert message={
                        <>
                            <Text as="b">ملاحظة :</Text> أسم الشركة سوف يكون نفسه رابط موقعكم مثال (www.market.com/{siteType}/{slug})
                        </>
                    } />
                </Col>
                <Col sm={{ span: 12 }}>
                    <Form.Item
                        name="Address"
                        label="عنوان الشركة"
                    >
                        <Input.TextArea placeholder="عنوان الشركة" />
                    </Form.Item>
                </Col>
            </Row>
        </CardComponent>
    );
}
