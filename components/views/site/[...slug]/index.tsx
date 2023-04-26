import { Col, Row } from "antd";
import ProductItem_01 from "components/containers/product-item/product-item";
import SlidePhoto from "components/containers/slider/slider";
import Container from "components/utils/container";
import categoriesType from "types/categories";
import ContentType from "types/products";

const CategoryDetails = ({ data }: { data: ContentType[] }) => {
  return (
    <Container style={{ marginTop: 20 }}>
      <Row gutter={[16, 16]}>
        <Col sm={{ span: 18 }}>
          <Row gutter={[16, 16]}>
            {data && data.map((item: ContentType, index: number) => (
              <Col key={index} sm={{ span: 4 }}>
                <ProductItem_01 item={item} key={index} />
              </Col>
            ))}
          </Row>
        </Col>
        {/* <Col sm={{ span: 6 }}>
          <div style={{ background: "red" }}>dasfsfasf</div>
        </Col> */}
      </Row>
    </Container >
  );
};

export default CategoryDetails;
