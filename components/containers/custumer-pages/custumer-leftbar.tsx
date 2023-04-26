import { UserOutlined } from "@ant-design/icons";
import { Avatar, List } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import route_paths from "paths";
import ListStyle from "./styles/custumer-leftbar.style";

const data = [
    {
        title: 'طلباتي',
        href: route_paths.custumer_orders,
    },
    {
        title: 'مفضلتي',
        href: route_paths.custumer_favorite,
    },
    {
        title: 'العناوين',
        href: route_paths.custumer_address,
    },
    {
        title: 'دعوة صديق',
        href: route_paths.custumer_invite,
    },
    {
        title: 'مساعدة',
        href: route_paths.custumer_help,
    },
    {
        title: 'الملف الشخصي',
        href: route_paths.custumer_profile,
    },
];
const CustumerSidebar = () => {
    const router = useRouter();
    return (
        <>
            <ListStyle
                size="large"
                header={
                    <List.Item >
                        <List.Item.Meta
                            avatar={<Avatar size={64} icon={<UserOutlined />} />}
                            title={<a href="javascript:void(0)">Ahmed Humada</a>}
                            description="ahmed profile ahmed "
                        />
                    </List.Item>
                }
                bordered
                dataSource={data}
                renderItem={(item: any) => <List.Item dir="rtl">
                    <Link href={`/${router.query["slug"]}/${router.query["company-slug"]}${item.href}`}><a>{item.title}</a></Link>
                </List.Item>}
            />
        </>
    );
};

export default CustumerSidebar;
