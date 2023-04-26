import CardComponent from "components/elements/card/card";
import { Button, Col, Form, Input, Row, Switch } from "antd";
import passwordValidations from "helpers/validations/password-validation";
import InputNumberElement from "components/elements/input-number/input-number";
import { useEffect, useCallback } from "react";
import slugGenerator from "helpers/slug-generator";
import checkNumber from "helpers/validations/check-number";
import points from "points";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import axiosConfig from "services/api";
import pointsSite from "points.site";

export default function AccontSettingView() {
    const [form] = Form.useForm();
    const { user, loading }: { user: any, loading: boolean } = useSelector((state: RootState) => state.user)
    const onFinish = useCallback(async (values: any) => {
        values.phoneNumber = values.phoneNumber?.number;
        values.setPassword = {
            password: values.password,
            rePassword: values.rePassword
        }
        const req = await axiosConfig().post(points.updateUserProfile, { ...values });
    }, [])
    useEffect(() => {
        if (user?.CompanySlug) {
            const getUser = async () => {
                const req = await (await axiosConfig().get(`${points.getUser}?id=${user?.UserId}`)).data
                form.setFieldsValue({ ...req, phoneNumber: { number: req.phoneNumber } })
            }
            getUser();
        }
    }, [user]);
    return (
        <CardComponent
            title="معلومات الحساب"
            style={{ padding: "5px 10px" }}
        >
            <Form onFinish={onFinish} form={form}>
                <Row gutter={[16, 16]}>
                    <Col sm={{ span: 8 }}>
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
                            label="أسم المستخدم"
                        >
                            <Input placeholder="أسم المستخدم" />
                        </Form.Item>
                    </Col>
                    <Col sm={{ span: 8 }}>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    type: "email",
                                },
                            ]}
                            label="الأيميل "
                        >
                            <Input placeholder=" الأيميل" />
                        </Form.Item>
                    </Col>
                    <Col sm={{ span: 8 }}>
                        <Form.Item
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                },
                                { validator: checkNumber }
                            ]}
                            label="الهاتف "
                        >
                            <InputNumberElement addonAfter="" placeholder=" رقم الهاتف" />
                        </Form.Item>
                    </Col>
                    <Col sm={{ span: 12 }}>
                        <Form.Item
                            name="password"
                            label="كلمة المرور"
                            rules={[
                                ({ getFieldValue }) => ({
                                    async validator(_, value) {
                                        return passwordValidations(value);
                                    },
                                }),
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col sm={{ span: 12 }}>
                        <Form.Item
                            name="rePassword"
                            label="تأكيد كلمة المرور"
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("كلمتا المرور اللتان أدخلتهما غير متطابقتين!")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Button htmlType="submit" type="primary">حفظ</Button>
            </Form>
        </CardComponent>
    );
}