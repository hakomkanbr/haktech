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
import Link from "next/link";
import route_paths from "paths";
import { FormItenStyle, FormStyle, SubmitBtnStyle } from "./styles/auth-style";

const LoginView: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const session: any = useSession();
  const { t } = useTranslation("login");

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      let res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: "/admin"
      });
      if (res?.ok && session.data.user.isMaster) {
        router.push("/admin");
      } else if (res?.ok) {
        router.push("/admin");
      }
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
          {" "}
          تسجيل الدخول{" "}
        </Text>
        <Text as="h3" align="center">
          {" "}
          سجل وأستمتع{" "}
        </Text>
        <FormItenStyle
          name="username"
          rules={[{ required: true, message: "رجاء أدخل أسم المستخدم" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="البريد الألكتروني" />
        </FormItenStyle>

        <FormItenStyle
          name="password"
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
        <FlexDiv dir={true}>
          <Link href={route_paths.forget_password}>هل نسيت كلمة السر</Link>
        </FlexDiv>

        <FormItenStyle>
          <SubmitBtnStyle htmlType="submit" type="primary">
            {loading ? "يرجى الأنتضار..." : "تسجيل الدخول"}
          </SubmitBtnStyle>
        </FormItenStyle>
      </FormStyle>
    </FlexDiv>
  );
};

export default withTranslation(LoginView);
