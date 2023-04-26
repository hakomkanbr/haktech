import { Col, Row } from "antd";
import CustumerSidebar from "components/containers/custumer-pages/custumer-leftbar";
import ProductItem_01 from "components/containers/product-item/product-item";
import Container from "components/utils/container";
import ContentType from "types/products";

const CustumerFavoriteView: React.FC<{ data: ContentType[] }> = ({ data }: { data: ContentType[] }) => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6 }}>
                    <CustumerSidebar />
                </Col>
                <Col md={{ span: 18 }} style={{ padding: 15 }}>
                    <Row gutter={[16, 16]}>
                        {
                            !data || data.length === 0 ? "no favorite" : (
                                <>
                                    {
                                        data?.map((item: ContentType, index: number) => (
                                            <Col md={{ span: 6 }} key={index}>
                                                <ProductItem_01 hasFavorite={false} key={index} item={item} />
                                            </Col>
                                        ))
                                    }
                                </>
                            )
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};

export default CustumerFavoriteView;
