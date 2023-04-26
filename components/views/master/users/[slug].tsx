import CardComponent from "components/elements/card/card";
import { Button, Form, Input, Switch } from "antd";
import axiosConfig from "../../../../services/api";
import points from "points";
import router_path from "paths";
import FlexDiv from "components/utils/flex-div";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import passwordValidations from "helpers/validations/password-validation";
import { useState } from "react"
import { useSession } from "next-auth/react";
import InputNumberElement from "components/elements/input-number/input-number";

export default function CreateEditUserView() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)
  const onFinish = useCallback(async (values: any) => {
    try {
      setLoading(true);
      if (typeof values.phoneNumber == "object") {
        values.phoneNumber = values.phoneNumber.number.toString();
      }
      await (
        await axiosConfig().post(points.master_postUser, { ...values })
      ).data;
      router.push(router_path.master_users);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    if (router.query.id) {
      const getCompany = async () => {
        const { data } = await axiosConfig().get(
          points.master_getUser + "?id=" + router.query?.id
        );
        form.setFieldsValue({ ...data });
      };
      getCompany();
    }
  }, []);

  return (
    <>
      <Form autoComplete="off" form={form} layout="vertical" onFinish={onFinish}>
        <CardComponent
          style={{ padding: "5px 20px", margin: "auto", width: "40%" }}
        >
          <Form.Item label="الحالة" name="activate">
            <Switch />
          </Form.Item>
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
              },
              {
                type: "string",
              },
            ]}
            label="الأسم"
          >
            <Input placeholder="الأسم" />
          </Form.Item>
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
          <Form.Item
            name="phoneNumber"
            label="التلفون"
          >
            <InputNumberElement placeholder="رقم التلفون" />
          </Form.Item>
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
          <Form.Item
            name="confirmPassword"
            label="تأكيد كلمة المرور"
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
            <Input.Password />
          </Form.Item>
          <FlexDiv
            justifyContent="space-between"
            as="div"
            bg="#f0f2f5"
            padding={[10, 15]}
          >
            <Button htmlType="submit" loading={loading} type="primary">
              {" "}
              حفظ البيانات{" "}
            </Button>
            <Button
              onClick={() => router.push(router_path.master_users)}
              type="primary"
            >
              رجوع
            </Button>
          </FlexDiv>
        </CardComponent>
      </Form>
    </>
  );
}
