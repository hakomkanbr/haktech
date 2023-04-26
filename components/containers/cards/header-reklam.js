import { Col, Row } from "antd";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";

const Header_reklam = () => {
  return (
    <Container style={{ padding: 30 }}>
      <Row>
        <Col xs={24} md={18}>
          <div>
            {/* <CustomImage radius={10} imgWidth={"100%"} imgHeight={56} objectFit="contain" src="/assets/header-reklam/slider-5.png" /> */}
          </div>
        </Col>
        <Col xs={24} md={6}>
          <FlexDiv alignItems="center">
            <div style={{ marginBottom: 20, position: "relative" }}>
              asd
              {/* <CustomImage radius={10} width={"100%"} height={"100%"} imgWidth={100} imgHeight={100} objectFit="contain" src="/assets/header-reklam/banner-5.jpg" /> */}
            </div>
            <div style={{ marginBottom: 20, position: "relative" }}>
              hello world
              {/* <CustomImage radius={10} width={"100%"} height={"100%"} imgWidth={100} imgHeight={100} objectFit="contain" src="/assets/header-reklam/banner-7.jpg" /> */}
            </div>
          </FlexDiv>
        </Col>
      </Row>
    </Container>
  );
};

export default Header_reklam;
