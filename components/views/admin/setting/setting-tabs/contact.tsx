import CardComponent from "components/elements/card/card";
import { Col, Form, Input, Row, Switch } from "antd";
import InputNumberElement from "components/elements/input-number/input-number";

const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('رجاء أدخل رقم هاتف صحيح'));
};

export default function ContactSection() {
    return (
        <CardComponent
            title="معلومات الأتصال"
            style={{ padding: "5px 10px" }}
            extra={
                <>
                    <Form.Item name="published" >
                        <Switch unCheckedChildren="" checkedChildren="" />
                    </Form.Item>
                </>
            }
        >
            <Row gutter={[16, 16]}>
                <Col sm={{ span: 12 }}>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                            },
                        ]}
                        label="الأيميل"
                    >
                        <Input.TextArea placeholder="الأيميل" />
                    </Form.Item>
                </Col>
                <Col sm={{ span: 12 }}>
                    <Form.Item
                        name="phone"
                        rules={[
                            { validator: checkPrice }
                        ]}
                        label="الهاتف "
                    >
                        <InputNumberElement addonAfter="" placeholder=" رقم الهاتف" />
                    </Form.Item>
                </Col>

            </Row>
        </CardComponent>
    );
}
