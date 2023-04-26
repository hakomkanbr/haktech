import CardComponent from "components/elements/card/card";
import { Form, Input, Select } from "antd";
import passwordValidations from "helpers/validations/password-validation";
import typesData from "data/types/types";
import InType from "types/types";
import InputNumberElement from "components/elements/input-number/input-number";
import { useState } from "react";
import UploadImage from "components/elements/upload/upload-single";
import PlacesEnum from "enums/file.enum";

const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('رجاء أدخل رقم هاتف صحيح'));
};

export default function GeneralSection() {
    const form = Form.useForm();
    return (
        <CardComponent
            style={{ padding: "5px 20px" }}
        >
            <Form.Item name="mainImageName" label="الصورة الرئيسية">
                <UploadImage form={form} module={PlacesEnum.Company} />
            </Form.Item>
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
                <Input placeholder="أسم الشركة" />
            </Form.Item>
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
                <Input placeholder="وصف قصير للشركة" />
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        required: true,
                    },
                ]}
                name="type"
                label="فئة المنتج"
            >
                <Select placeholder="فئة المنتج">
                    {typesData.map((item: InType, index: number) => (
                        <Select.Option key={index} value={item.id}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="userName"
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
            <Form.Item
                name="userEmail"
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
                name="userPhoneNumber"
                rules={[
                    {
                        required: true,
                    },
                    { validator: checkPrice }
                ]}
                label="الهاتف "
            >
                <InputNumberElement addonAfter="" placeholder=" رقم الهاتف" />
            </Form.Item>
            <Form.Item
                name="userPassword"
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
                name="confirm"
                label="تأكيد كلمة المرور"
                dependencies={["userPassword"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("userPassword") === value) {
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
        </CardComponent>
    );
}
