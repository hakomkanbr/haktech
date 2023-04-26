import { NavbarStyle } from "./style";
import { useEffect, useState } from "react";
import Container from "components/utils/container";
import CustomImage from "components/utils/c-image";
import FlexDiv from "components/utils/flex-div";
import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import data from "./data";
export default function CoNavbar() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const items: MenuProps['items'] = [
        {
            label: 'Clicking me will not close the menu.',
            key: '1',
        },
        {
            label: 'Clicking me will not close the menu also.',
            key: '2',
        },
        {
            label: 'Clicking me will close the menu.',
            key: '3',
        },
    ];
    return (
        <NavbarStyle className="bg-navbar" id="myNavbar">
            <Container>
                <nav>
                    <CustomImage src={data.src} height={50} width={160} imgHeight={35} imgWidth={110} />
                    <div>
                        {data.options.map((item, index) => (
                            <Dropdown
                                key={index}
                                menu={{
                                    items: item.children,
                                }}
                            >
                                <a href="/">
                                    {item.label}
                                    {item.children?.length ? <DownOutlined /> : ""}
                                </a>
                            </Dropdown>
                        ))}
                    </div>
                </nav>
            </Container>
        </NavbarStyle>
    );
}
