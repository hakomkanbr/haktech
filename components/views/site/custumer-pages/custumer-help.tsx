import { Col, Row } from "antd";
import CustumerSidebar from "components/containers/custumer-pages/custumer-leftbar";
import Container from "components/utils/container";

const CustumerHelpView: React.FC = () => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6 }}>
                    <CustumerSidebar />
                </Col>
                <Col md={{ span: 18 }}>
                    custumer help
                </Col>
            </Row>
        </Container>
    )
};

export default CustumerHelpView;
