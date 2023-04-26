import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

interface InputValue {
    number?: number | null;
}

interface NumberInputProps {
    value?: InputValue;
    onChange?: (value: InputValue) => void;
    placeholder: string;
    addonAfter?: string | React.ReactNode
}

const InputNumberElement: React.FC<NumberInputProps> = ({ value = {}, onChange, placeholder, addonAfter }) => {
    const [number, setNumber] = useState<any>();

    const triggerChange = (changedValue: { number?: number | null; }) => {
        onChange?.({ number, ...value, ...changedValue });
    };

    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(e.target.value);
        if (Number.isNaN(number)) {
            return;
        }

        if (!('number' in value)) {
            setNumber(newNumber);
        }
        if (Number.isNaN(newNumber)) {
            setNumber(null);
            triggerChange({ number: null });
        } else {
            triggerChange({ number: newNumber });
        }
    };

    return (
        <Input
            type="text"
            addonBefore={addonAfter}
            placeholder={placeholder}
            value={value.number || number}
            onChange={onNumberChange}
        />

    );
};

export default InputNumberElement;