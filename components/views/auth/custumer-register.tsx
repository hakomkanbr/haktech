import { Button, Col, Form, Input, Row } from "antd";
import FlexDiv from "components/utils/flex-div";
import React, { useState } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import withTranslation from "next-translate/withTranslation";
import Text from "components/utils/text";
import { MailOutlined, PhoneOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import axiosConfig from "services/api";
import route_paths from "paths";
import pointsSite from "points.site";


const FormStyle = styled(Form)`
  width: 700px;
  padding: 70px 50px;
  box-shadow: 0 0 35px rgb(0 0 0 / 10%);
  background-color: #ffffff;
  margin: auto;
  position: relative;

  .ant-form-item-label {
    padding-bottom: 0;
  }
`;
const FormItenStyle = styled(Form.Item)`
    //   .ant-input-affix-wrapper {
    //     padding: 14.5px 0;
    //     border: none;
    //     border-bottom: 2px solid #bebcbc;
    //   }

    //   .ant-input-affix-wrapper > input.ant-input {
    //     padding: 0 10px;
    //     font-size: 16px;
    //   }
`;
const SubmitBtnStyle = styled(Button)`
  width: 100%;
  z-index: 2;
  margin-top: 20px;
  padding: 15px;
  height: 50px;
  background-color: #00c5e7;
`;

const CustumerRegisterView: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const session: any = useSession();
    const { t } = useTranslation("login");

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const request = await axiosConfig()
                .post(pointsSite.register, {
                    ...values,
                    "CompanySlug": "test1company"
                })
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <FlexDiv
            style={{
                backgroundPosition: "100% 100%",
            }}
            as="div"
            padding={[50, 0]}
            height={"100vh"}
            noFlex={true}
            bg="#f1eeee"
        >
            <FormStyle
                name="basic"
                dir="rtl"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
            // labelCol={{
            //     xs: { span: 24 }
            // }}
            // wrapperCol={{
            //     xs: { span: 24 }
            // }}
            >
                {/* <Text as="h1" align="center">
                    أنشأ حساب جديد
                </Text> */}
                <Row gutter={[20, 20]}>
                    <Col md={{ span: 12 }}>
                        <FormItenStyle
                            label="الأسم الكامل"
                            name="Username"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="الأسم الأول" />
                        </FormItenStyle>
                    </Col>
                    <Col md={{ span: 12 }}>
                        <FormItenStyle
                            label="البريد الألكتروني"
                            name="Email"
                            rules={[{ required: true }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="البريد الألكتروني" />
                        </FormItenStyle>
                    </Col>
                    <Col md={{ span: 12 }}>
                        <FormItenStyle
                            label="رقم الهاتف"
                            name="phoneNumber"
                            rules={[{ required: true }]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="رقم الهاتف" />
                        </FormItenStyle>
                    </Col>
                    <Col md={{ span: 12 }}>
                        <FormItenStyle
                            label="كلمة المرور"
                            name="Password"
                            rules={[
                                { required: true, message: "رجاء أدخل كلمة المرور" },
                                { min: 8, message: "كلمة المرور يجب أن تكون اكثر من 8" },
                            ]}
                        >
                            <Input.Password
                                prefix={<SecurityScanOutlined />}
                                placeholder="كلمة المرور"
                            />
                        </FormItenStyle>
                    </Col>
                </Row>
                <FormItenStyle>
                    <SubmitBtnStyle htmlType="submit" type="primary">
                        {loading ? "يرجى الأنتضار..." : "تسجيل الدخول"}
                    </SubmitBtnStyle>
                </FormItenStyle>
            </FormStyle>
        </FlexDiv>
    );
};

export default withTranslation(CustumerRegisterView);
