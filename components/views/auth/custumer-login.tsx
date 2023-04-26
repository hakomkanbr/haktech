import { Form, Input } from "antd";
import React from "react";
import styled from "styled-components";
import Text from "components/utils/text";
import { MailOutlined, SecurityScanOutlined } from "@ant-design/icons";


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

const CustumerLoginView: React.FC = () => {
    return (
        <>
            <Text as="h1" align="center">
                {" "}
                تسجيل الدخول{" "}
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
        </>
    );
};

export default CustumerLoginView;
