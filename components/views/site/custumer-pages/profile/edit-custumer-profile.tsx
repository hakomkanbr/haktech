import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row } from "antd";
import CustumerSidebar from "components/containers/custumer-pages/custumer-leftbar";
import CardComponent from "components/elements/card/card";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import { useRouter } from "next/router";
import route_paths from "paths";
import pointsSite from "points.site";
import { useState, useEffect } from "react";
import axiosConfig from "services/api";

const EditCustumerProfileView: React.FC<any> = ({ data }) => {
    const [form] = Form.useForm();
    const [userData, setUserData] = useState(data);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    console.info("data : ", data);
    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            await axiosConfig().post(pointsSite.updateProfile, { ...values, id: userData?.id });
            message.success("تم تحديث معلومات المستخدم بنجاح")
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    return (
        <Container style={{ paddingTop: 15 }}>
            <Row gutter={[16, 16]}>
                <Col md={{ span: 6 }}>
                    <CustumerSidebar />
                </Col>
                <Col md={{ span: 18 }}>
                    <CardComponent style={{ padding: 15 }}>
                        <Form form={form} name="editProfile" initialValues={{
                            ...data,
                            userName: data?.name
                        }} layout="vertical" onFinish={onFinish}>
                            <Row gutter={[16, 16]}>
                                <Col md={{ span: 12 }}>
                                    <Form.Item
                                        label="الاسم"
                                        name="userName"
                                        rules={[{ required: true }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="الاسم" />
                                    </Form.Item>
                                </Col>
                                <Col md={{ span: 12 }}>
                                    <Form.Item
                                        label="الأيميل"
                                        name="email"
                                        rules={[{ required: true }, { type: "email" }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="الأيميل" />
                                    </Form.Item>
                                </Col>
                                <Col md={{ span: 12 }}>
                                    <Form.Item
                                        label="رقم الهاتف"
                                        name="phoneNumber"
                                        rules={[{ required: true }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="رقم التلفون" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <FlexDiv margin={[0, 0, 15, 0]} dir={true} justifyContent="space-between">
                                <Button htmlType="submit" loading={loading} type="primary">أرسال</Button>
                                {/* <Button type="default" onClick={() => {
                                    router.push(route_paths.custumer_profile)
                                }}>رجوع</Button> */}
                            </FlexDiv>
                        </Form>
                    </CardComponent>
                </Col>
            </Row>
        </Container>
    )
};

export default EditCustumerProfileView;
