import CardComponent from "components/elements/card/card";
import { Checkbox, Form, Input, Select } from "antd";
import { useState } from "react";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const plainOptions = [
    {
        label: "EFT",
        value: "eft"
    },
    {
        label: "عند التسليم",
        value: "onADoor"
    }
];

export default function PayOptionsSection() {
    const [hasCreditCard, setHasCreditCard] = useState<boolean>(false);

    const onChange = (checkedValues: CheckboxValueType[]) => {
        if (checkedValues.includes("eft")) {
            setHasCreditCard(true);
        } else {
            setHasCreditCard(false);
        }
        // setPayMethod(checkedValues);
    };

    return (
        <CardComponent
            style={{ padding: "5px 20px" }}
        >
            <Form.Item label="طريقة الدفع" name="payMethod">
                <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
            </Form.Item>

            {
                hasCreditCard ? (
                    <>
                        <Form.Item name="cardName" label="اسم صاحب الكرت">
                            <Input />
                        </Form.Item>
                        <Form.Item name="cardIban" label="IBAN">
                            <Input />
                        </Form.Item>
                    </>
                ) : ""
            }
            <Form.Item name="currency" label="العملة">
                <Select placeholder="العملة">
                    <Select.Option value="tl">TL</Select.Option>
                    <Select.Option value="usd">USD</Select.Option>
                    <Select.Option value="euro">EURO</Select.Option>
                </Select>
            </Form.Item>
        </CardComponent>
    );
}
