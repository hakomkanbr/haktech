import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps, Select } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import AdminLayoutStyle from "./index.style";
import { useDispatch } from "react-redux";
import { reduxChangePageDiraction } from "redux/app/reducer";
import { useRouter } from "next/router";
import options from "./options";
import { useSession, signIn, signOut } from "next-auth/react";
import route_paths from "paths";
import { checkUserLogin } from "redux/web/user-slice";
import Link from "next/link";


const { Header, Sider, Content } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a href="/auth/login" onClick={() => signOut({
        redirect: false,
        callbackUrl: "/auth/login"
      })}>
        تسجيل الخروج
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <Link href={route_paths.admin_profile}>
        الملف الشخصي
      </Link>
    ),
  },
];
const AdminLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [pageWidth, setPageWidth] = useState<number>(70);
  const [current, setCurrent] = useState<string>("/admin");
  const [pageDiraction, setPageDiraction] = useState<boolean>(false);
  const { data, status }: any = useSession();
  const router = useRouter();
  useEffect(() => {
    dispatch(checkUserLogin());
    setPageWidth(window.innerWidth < 767 ? 0 : 70);
  }, []);
  // if (status === "unauthenticated") {
  //   router.push(route_paths.login);
  // } else if (data?.user?.isMaster === true) {
  //   router.push("/master");
  // } else if (status === "loading") {
  //   return "loading....";
  // }

  const { locale, locales } = useRouter();
  var optionsItem: any;
  switch (locale) {
    case "ar":
      optionsItem = options["ar"];
      break;
    case "en":
      optionsItem = options["en"];
      break;
    case "tr":
      optionsItem = options["tr"];
      break;
    default:
      optionsItem = options["ar"];
      break;
  }
  const changePageDiraction = (dir: string) => {
    dispatch(reduxChangePageDiraction(dir));
    setPageDiraction(pageDiraction);
  };
  const onClickItems = (e: any) => {
    router.push(e.key);
    setCurrent(e.key);
  };



  return (
    <AdminLayoutStyle>
      <Layout>
        <Sider
          width={250}
          collapsedWidth={pageWidth}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <h1 className="logo">{!collapsed ? "Applighterz" : "A"}</h1>
          <Menu
            onClick={onClickItems}
            mode="inline"
            selectedKeys={[current]}
            defaultSelectedKeys={["1"]}
            items={optionsItem}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0 15px",
            }}
          >
            <div className="left-minify">
              <ul>
                <li>
                  {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: "trigger",
                      onClick: () => setCollapsed(!collapsed),
                    }
                  )}
                </li>
              </ul>
            </div>
            <div className="right-minify">
              <ul>
                {/* select language */}
                <li>
                  <Dropdown menu={{ items }} placement="bottom">
                    <Avatar style={{ cursor: "pointer" }} size={40}>
                      USER
                    </Avatar>
                  </Dropdown>
                </li>
                {/* <li>
                  <Select
                    defaultValue={locale}
                    onChange={(e) => {
                      router.push(router.pathname, {}, { locale: e });
                      changePageDiraction(e != "ar" ? "ltr" : "rtl");
                    }}
                  >
                    {locales &&
                      locales.map((l, i) => {
                        return <Select.Option key={l}>{l}</Select.Option>;
                      })}
                  </Select>
                </li> */}
              </ul>
            </div>
          </Header>
          <Content
            className="site-layout-background"
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AdminLayoutStyle>
  );
};

export default AdminLayout;
