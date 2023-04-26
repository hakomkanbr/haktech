import FlexDiv from "components/utils/flex-div";
import { UserOutlined } from "@ant-design/icons";
import { FiPhoneCall } from "react-icons/fi";
import Container from "../../utils/container";
import Text from "components/utils/text";
import theam from "config/theam";
import { Avatar, Badge, Button, Col, Dropdown, Input, MenuProps, Row, Select, Space } from "antd";
import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import NavItems from "./items";
import Image from "next/image";
import categoriesType from "types/categories";
import ArabaDrawer from "../drawer-araba/right-araba";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustumerContext } from "contexts/custumer-context";
import React from "react";
import { useRouter } from "next/router";
import route_paths from "paths";
import Link from "next/link";
import styled from "styled-components";
import { InWebSettingContextProps, WebSettingContext } from "contexts/web-setting";
import { BadgeStyle, SearchSpaceStyle } from "./style";
import { TbShoppingBag } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";




const Navbar = ({ data }: { data: categoriesType[] }) => {
  const custumerContext = React.useContext(CustumerContext);
  const { generalData }: InWebSettingContextProps = React.useContext(WebSettingContext);
  const [arabaOpen, setArabaOpen] = useState(false);
  const { cart } = useSelector((state: any) => state.virtualCustumer);
  const { user, loading } = useSelector((state: any) => state.user);
  const [cardProductsCount, setCardProductsCount] = useState<string>("0")
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`/${router.query["slug"]}/${router.query["company-slug"]}${route_paths.custumer_orders}`}>
          طلباتي
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href={`/${router.query["slug"]}/${router.query["company-slug"]}${route_paths.custumer_favorite}`}>
          مفضلتي
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link href={`/${router.query["slug"]}/${router.query["company-slug"]}${route_paths.custumer_address}`}>
          المواقع
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link href={`/${router.query["slug"]}/${router.query["company-slug"]}${route_paths.custumer_invite}`}>
          دعوة صديق
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link href={`/${router.query["slug"]}/${router.query["company-slug"]}${route_paths.custumer_help}`}>
          مساعدة
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Link href={`/${router.query["slug"]}/${router.query["company-slug"]}${route_paths.custumer_profile}`}>
          الملف الشخصي
        </Link>
      ),
    },
  ];
  useEffect(() => {
    console.info("webSettingContext", generalData);
    setCardProductsCount(cart?.length);
  }, [cart]);

  const onClickAraba = useCallback(async () => {
    setArabaOpen(true);
  }, []);

  return (
    <>
      <Container>
        <Row align="middle">
          <Col
            xs={{ span: 24, order: 1 }}
            sm={{ span: 6, order: 1 }}
            md={{ span: 6, order: 1 }}
            lg={{ span: 8, order: 1 }}
          >
            <FlexDiv
              noFlex={true}
              cstyle={`
                @media (max-width: 600px) {
                  margin-top: 15px;
                  margin-bottom: 10px;
                  text-align: center;
                }
              `}
            >
              <Image
                src="/assets/images/logo.svg"
                width={250}
                height={100}
              />
            </FlexDiv>
          </Col>
          <Col
            xs={{ span: 24, order: 2 }}
            sm={{ span: 6, order: 3 }}
            md={{ span: 12, order: 3 }}
            lg={{ span: 10, order: 3 }}
          >
            <SearchSpaceStyle >
              <Select style={{ width: "25%" }} defaultValue="Zhejiang" options={[]} />
              <Input style={{ width: "55%" }} defaultValue="أبحث هنا" />
              <Button style={{ width: "20%" }} type="default">أبحث</Button>
            </SearchSpaceStyle>
          </Col>
          <Col
            xs={{ span: 24, order: 4 }}
            sm={{ span: 6, order: 4 }}
            md={{ span: 6, order: 4 }}
            lg={{ span: 6, order: 4 }}
          >
            <FlexDiv
              cstyle={`
                @media (max-width: 600px) {
                  margin-top: 15px;
                  justify-content:center;
                }
              `}
              alignItems="center"
              justifyContent="end"
            >
              {
                loading ? "" :
                  user && Object.keys(user).length ? (
                    <Dropdown menu={{ items }} placement="bottomRight">
                      <Avatar style={{ backgroundColor: '#fff', color: "black", fontSize: "45px", width: "49px", height: "47px", cursor: "pointer", margin: "0 12px" }} size="large" icon={<FaUserCircle />} />
                    </Dropdown>
                  ) : ``
              }
              <BadgeStyle count={cardProductsCount}>
                <Text onClick={onClickAraba} cstyle={`cursor: pointer;`} size={25}>
                  <AiOutlineShopping />
                </Text>
              </BadgeStyle>
              <div>
                <Text as="h4" color={theam.colors.black} margin={[0, 0, 0, 5]}>
                  عربتك
                </Text>
                <Text
                  color={theam.colors.orange}
                  size={14}
                  bold="500"
                  as="p"
                  margin={0}
                >
                  $0.00
                </Text>
              </div>
            </FlexDiv>
          </Col>
        </Row>
      </Container>
      <NavItems data={data} />
      <ArabaDrawer setArabaOpen={setArabaOpen} open={arabaOpen} />
    </>
  );
};

export default Navbar;
