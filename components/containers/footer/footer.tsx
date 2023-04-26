import { Col, Row } from "antd";
import CustomImage from "components/utils/c-image";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { InWebSettingContextProps, WebSettingContext } from "contexts/web-setting";
import getTypeByEnum from "helpers/getItemByEnum";
import Link from "next/link";
import categoriesType from "types/categories";
import { FooterStyle } from "./footer.style";
import React from "react";
import { useRouter } from "next/router";

const Footer: React.FC<{ data: categoriesType[] }> = ({ data }) => {
  const { generalData }: InWebSettingContextProps = React.useContext(WebSettingContext);
  const router = useRouter();
  return (
    <FooterStyle>
      <Container>
        <Row gutter={16}>
          <Col sm={5}>
            <Text as="h2" color="#fff">
              مساعدة
            </Text>
            <Text as="p" margin={8} color="#fff">
              <Link
                href={{
                  pathname: "/help",
                }}
              >
                <a> سياسة الخصوصية</a>
              </Link>
            </Text>

          </Col>
          <Col sm={5}>
            <Text as="h2" color="#fff">
              معلومات التواصل
            </Text>
            {data &&
              data.map((item: categoriesType, index: number) => (
                <Text as="p" key={index} margin={8} color="#fff">
                  <Link
                    href={{
                      pathname: "/[slug]/[company-slug]/[category-slug]",
                      query: {
                        slug: getTypeByEnum(item.companyType),
                        "company-slug": item.companySlug,
                        "category-slug": item.slug,
                      },
                    }}
                  >
                    <a> {item.name}</a>
                  </Link>
                </Text>
              ))}
          </Col>
          <Col sm={5}>
            <Text as="h2" color="#fff">
              الأقسام
            </Text>
            {data &&
              data.map((item: categoriesType, index: number) => (
                <Text as="p" key={index} margin={8} color="#fff">
                  <Link
                    href={{
                      pathname: "/[slug]/[company-slug]/[category-slug]",
                      query: {
                        slug: getTypeByEnum(item.companyType),
                        "company-slug": item.companySlug,
                        "category-slug": item.slug,
                      },
                    }}
                  >
                    <a> {item.name}</a>
                  </Link>
                </Text>
              ))}
          </Col>
          <Col sm={9}>
            <FlexDiv noFlex={true} dir={true} as="div">
              <CustomImage
                src="/assets/resturants/logo.webp"
                width={150}
                height={50}
                imgWidth={150}
                style={{ margin: "20px auto" }}
                imgHeight={50}
              />
            </FlexDiv>
            <Text as="div" margin={[10, 0]} color="#fff">
              {generalData?.company?.description}
            </Text>
          </Col>
        </Row>
      </Container>
    </FooterStyle>
  );
};

export default Footer;
