import { Button, Col, Row } from "antd";
import CustumerSidebar from "components/containers/custumer-pages/custumer-leftbar";
import CardComponent from "components/elements/card/card";
import CustomImage from "components/utils/c-image";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";

const CustumerInviteView: React.FC = () => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6 }}>
                    <CustumerSidebar />
                </Col>
                <Col md={{ span: 18 }} style={{ padding: 20 }}>
                    <CardComponent>
                        <FlexDiv justifyContent="center">
                            <div>
                                <CustomImage imgWidth={120} imgHeight={100} src="/assets/images/180-1801397_send-message-icon-png-transparent-png.png"></CustomImage>
                                <Text as="b" cstyle={`
                                   display:block;
                                `} margin={[10, 0]}>دعوة الأصدقاء و اكتشاف الجديد</Text>
                                <Button type="text">شارك الكود الخاص بك</Button>
                            </div>
                        </FlexDiv>
                    </CardComponent>
                </Col>
            </Row>
        </Container>
    )
};

export default CustumerInviteView;
