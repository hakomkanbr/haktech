import CardComponent from "components/elements/card/card";
import { Col, Form, Input, Row, Select, Switch } from "antd";
import { useEffect } from "react";
import slugGenerator from "helpers/slug-generator";

export default function SeoSettingSection() {
    const form = Form.useFormInstance();
    const slug = slugGenerator(Form.useWatch("name") ?? "");
    const siteType = slugGenerator("resturant");
    useEffect(() => {
        console.info("site type :", slug, siteType)
    }, []);
    return (
        <CardComponent
            title="معلومات الحساب"
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
                        name="seoTitle"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                min: 3,
                            },
                        ]}
                        label="عنوان الصفحة"
                    >
                        <Input.TextArea placeholder="عنوان الصفحة" />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 12 }}>
                    <Form.Item
                        name="seoKeyWords"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        label="العلامات"
                    >
                        <Select
                            mode="tags"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="العلامات"
                        />
                    </Form.Item>
                </Col>
            </Row>

        </CardComponent>
    );
}
