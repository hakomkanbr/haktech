import CardComponent from "components/elements/card/card";
import { Button, Col, Form, Input, Row, Select, Switch } from "antd";
import { useEffect } from "react";
import slugGenerator from "helpers/slug-generator";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import socialMediaData from "enums/social-media";

export default function SocialMediaSettingSection() {
    const form = Form.useFormInstance();
    const slug = slugGenerator(Form.useWatch("name") ?? "");
    const siteType = slugGenerator("resturant");
    useEffect(() => {
        console.info("site type :", slug, siteType)
    }, []);
    return (
        <CardComponent
            title="مواقع التواصل الأجتماعي"
            style={{ padding: "5px 10px" }}
            extra={
                <>
                    <Form.Item name="published" >
                        <Switch unCheckedChildren="" checkedChildren="" />
                    </Form.Item>
                </>
            }
        >
            <Form.List name="socials">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Row key={key} gutter={[16, 16]} >
                                <Col sm={{ span: 10 }}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                    >
                                        <Select placeholder="أختر..">
                                            {socialMediaData.map((item: any, index: number) => (
                                                <Select.Option key={index} value={item.value}>{item.label}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col sm={{ span: 10 }}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'url']}
                                    >
                                        <Input placeholder="الرابط" />
                                    </Form.Item>
                                </Col>
                                <Col sm={{ span: 4 }}>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Col>
                            </Row>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                أضف واحد أخر
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </CardComponent >
    );
}
