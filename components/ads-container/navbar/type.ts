import { MenuProps } from "antd";

type InOption = {
    key: number | string
    label: string
    children?: MenuProps["items"]
}

type InProps = {
    src: string;
    options: InOption[]
}

export default InProps;