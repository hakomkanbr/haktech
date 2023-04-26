import {
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import route_paths from "paths";
import OptionsTypes from "../types";

const items: OptionsTypes = {
  en: [
    {
      label: "Dashboard",
      key: "/admin",
      icon: <HomeOutlined />,
    },
    {
      label: "Products",
      key: route_paths.admin_products,
      icon: <AppstoreOutlined />,
    },
    {
      label: "Categorys",
      key: route_paths.admin_categories,
      icon: <MailOutlined />,
    },
    {
      label: "settings",
      key: route_paths.admin_setting,
      icon: <MailOutlined />,
      children: [
        {
          label: "Ayarlar",
          key: "/admin/Ayarlar",
          icon: <AppstoreOutlined />,
        },
        {
          label: "yetkiler",
          key: "/admin/yetkiler",
          icon: <AppstoreOutlined />,
        },
      ],
    },
  ],
  ar: [
    {
      label: "الصفحة الرئيسية",
      key: "/admin",
      icon: <HomeOutlined />,
    },
    {
      label: "الأقسام",
      key: route_paths.admin_categories,
      icon: <AppstoreOutlined />,
    },
    {
      label: "المنتجات",
      key: route_paths.admin_products,
      icon: <AppstoreOutlined />,
      // disabled: true,
    },
    {
      label: "طلباتي",
      key: route_paths.admin_orders,
      icon: <AppstoreOutlined />,
      // disabled: true,
    },
    {
      label: "المستخدمين",
      key: route_paths.admin_users,
      icon: <UserOutlined />,
    },
    {
      label: "الأعدادات",
      key: "/admin/setting",
      icon: <MailOutlined />,
    },
  ],
  tr: [
    {
      label: "Kontrol Panel",
      key: "/admin",
      icon: <MailOutlined />,
    },
    {
      label: "ürünler",
      key: "/admin/products",
      icon: <AppstoreOutlined />,
      // disabled: true,
    },
    {
      label: "kategoriler",
      key: "/admin/categories",
      icon: <MailOutlined />,
    },
    {
      label: "Ayarlar",
      key: "/admin/setting",
      icon: <MailOutlined />,
    },
  ],
};

export default items;
