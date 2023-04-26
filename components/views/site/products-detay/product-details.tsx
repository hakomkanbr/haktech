import { Col, Row } from "antd";
import Container from "components/utils/container";
import ProductImgDetay from "./images-view";
import ContentType from "types/products";
import OtherInformation from "./other-information";
import FlexDiv from "components/utils/flex-div";
import SlidePhoto from "components/containers/slider/slider";
import UnderTabs from "./under-tabs";
import { useEffect } from "react";

const ProductDetay = ({ productDetay, otherProduct }: { productDetay: ContentType, otherProduct: any }) => {

  useEffect(() => {
    console.info("productDetay : ", productDetay);
  }, [])

  return (
    <Container
      style={{
        backgroundColor: "#fff",
        padding: "80px 0",
      }}
    >
      <FlexDiv noFlex={true} width="80%" margin="20px auto">
        <Row>
          <Col sm={12}>
            <ProductImgDetay
              image={productDetay?.mainImageName}
              imageNames={productDetay?.imageNames}
            />
          </Col>
          <Col sm={12}>
            <OtherInformation data={productDetay} />
          </Col>
        </Row>
      </FlexDiv>
      <UnderTabs data={productDetay} />
      <SlidePhoto data={otherProduct} />
    </Container>
  );
};

export default ProductDetay;
