import { Button, Form, Input } from "antd";
import FlexDiv from "components/utils/flex-div";
import React, { useState } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import withTranslation from "next-translate/withTranslation";
import Text from "components/utils/text";
import { MailOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import axiosConfig from "services/api";
import points from "points";
import passwordValidations from "helpers/validations/password-validation";
import { FormItenStyle, FormStyle, SubmitBtnStyle } from "./styles/auth-style";


const ResetPasswordView: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const session: any = useSession();
  const { t } = useTranslation("login");

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      let res = await (await axiosConfig().post(points.rePassword + "?email=" + values?.email)).data
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <FlexDiv
      style={{
        backgroundImage: `url("/assets/images/back.jpg")`,
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
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Text as="h1" align="center">
          أعادة تعيين كلمة السر
        </Text>
        <FormItenStyle
          name="email"
          rules={[{ required: true, message: "رجاء أدخل أسم المستخدم" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="البريد الألكتروني" />
        </FormItenStyle>
        <Form.Item
          name="password"
          rules={[
            ({ getFieldValue }) => ({
              async validator(_, value) {
                return passwordValidations(value);
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="كلمة المرور" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
            },
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
          <Input.Password placeholder="تأكيد كلمة المرور" />
        </Form.Item>

        <FormItenStyle>
          <SubmitBtnStyle htmlType="submit" type="primary">
            {loading ? "يرجى الأنتضار..." : "متابعة"}
          </SubmitBtnStyle>
        </FormItenStyle>
      </FormStyle>
    </FlexDiv>
  );
};

export default ResetPasswordView
