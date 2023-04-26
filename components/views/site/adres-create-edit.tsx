import { Form, Input, Divider } from "antd";
import { useEffect } from "react";

function AdresCreateEdit({
    data
}: any) {
    const form = Form.useFormInstance();
    useEffect(() => {
        form.setFieldsValue(data);
    }, [data])

    return (
        <>
            <Divider orientation="left"> معلومات المتلقي</Divider>
            <Form.Item name="name" label="الأسم المتلقي">
                <Input placeholder="الأسم الأول" />
            </Form.Item>
            <Form.Item name="phoneNo" label="رقم التلفون">
                <Input placeholder="رقم التلفون" />
            </Form.Item>
            <Divider orientation="left"> معلومات عنوانك</Divider>
            <Form.Item name="country" label="البلد">
                <Input placeholder="البلد" />
            </Form.Item>
            <Form.Item name="city" label="المدينة">
                <Input placeholder="المدينة" />
            </Form.Item>
            <Form.Item name="address" label="العنوان">
                <Input placeholder="العنوان" />
            </Form.Item>
            <Form.Item name="addressName" rules={[{
                required: true
            }]} label="أعط هذا العنوان اسم">
                <Input placeholder="أعط هذا العنوان اسم.." />
            </Form.Item>
        </>
    );
}

export default AdresCreateEdit;