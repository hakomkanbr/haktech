import { Button, Col, Descriptions, Row } from "antd";
import CustumerSidebar from "components/containers/custumer-pages/custumer-leftbar";
import CardComponent from "components/elements/card/card";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { useRouter } from "next/router";
import route_paths from "paths";

const CustumerProfileView: React.FC<any> = ({ data }) => {
    const router = useRouter();
    console.info("data : ", data);
    return (
        <Container style={{ paddingTop: 15 }}>
            <Row gutter={[16, 16]}>
                <Col md={{ span: 6 }}>
                    <CustumerSidebar />
                </Col>
                <Col md={{ span: 18 }}>
                    <FlexDiv margin={[0, 0, 15, 0]} dir={true} onClick={() => {
                        router.push(`/${router.query["slug"]}/${router.query["company-slug"]}${route_paths.custumer_profile_edit}`);
                    }} justifyContent="space-between">
                        <Button type="dashed">تعديل معلوماتي</Button>
                    </FlexDiv>
                    <Row gutter={[16, 16]}>
                        <Col md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }} >
                            <FlexDiv bg="#fff" noFlex={true} cstyle={`
                                border:1px solid #f0f0f0;
                            `}>
                                <Text as="p" size={20} margin={[10, 0]} bold="bold" color="#f87b6b" align="center" dir="rtl">{data?.allOrders}</Text>
                                <Text as="p" align="center" dir="rtl">جميع الطلبات</Text>
                            </FlexDiv>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }} >
                            <FlexDiv bg="#fff" noFlex={true} cstyle={`
                                border:1px solid #f0f0f0;
                            `}><Text as="p" size={20} margin={[10, 0]} bold="bold" color="#f87b6b" align="center" dir="rtl">{data?.sendedOrders}</Text>
                                <Text dir="rtl" as="p" align="center">الطلبات المرسلة</Text></FlexDiv>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }} >
                            <FlexDiv bg="#fff" noFlex={true} cstyle={`
                                border:1px solid #f0f0f0;
                            `}>
                                <Text as="p" size={20} margin={[10, 0]} bold="bold" color="#f87b6b" align="center" dir="rtl">{data?.confirmedOrders}</Text>
                                <Text dir="rtl" as="p" align="center">الطلبات المقبولة</Text>
                            </FlexDiv>
                        </Col>
                        <Col md={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 24 }} >
                            <FlexDiv bg="#fff" noFlex={true} cstyle={`
                                border:1px solid #f0f0f0;
                            `}>
                                <Text as="p" size={20} margin={[10, 0]} bold="bold" color="#f87b6b" align="center" dir="rtl">{data?.waitingOrders}</Text>
                                <Text dir="rtl" as="p" align="center">إنتظار التسليم</Text>
                            </FlexDiv>
                        </Col>
                    </Row>
                    <CardComponent style={{ marginTop: 25 }}>
                        <Descriptions title="معلوماتي" style={{ padding: "0 15px" }}>
                            <Descriptions.Item label="الأسم">{data?.name}</Descriptions.Item>
                            <Descriptions.Item label="الأيميل">{data?.email}</Descriptions.Item>
                            <Descriptions.Item label="رقم الهاتف">{data?.phoneNumber}</Descriptions.Item>
                        </Descriptions>
                    </CardComponent>
                </Col>
            </Row>
        </Container>
    )
};

export default CustumerProfileView;
