import { Col, Row } from "antd";
import Container from "components/utils/container";
import Text from "components/utils/text";
import { FooterStyle } from "./style";

export default function CoFooter() {
    return (
        <FooterStyle id="myFooter">
            <Container>
                <Row>
                    <Col sm={{ span: 12 }} md={{ span: 6 }}>
                        <Text color="#fff" as="h3">معلومات التواصل</Text>
                        <Text color="#fff" as="p">+(972)509599989</Text>
                        <Text color="#fff" as="p">applighterz@gmail.com</Text>
                    </Col>
                    <Col sm={{ span: 12 }} md={{ span: 4 }}>
                        <Text color="#fff" as="h3">أستكشاف</Text>
                        <Text color="#fff" as="p">خطة التسعير</Text>
                        <Text color="#fff" as="p">معلومات عنا</Text>
                        <Text color="#fff" as="p">تواصل معنا</Text>
                        <Text color="#fff" as="p">سياسة الخصوصية</Text>
                        <Text color="#fff" as="p">الأحداث القادمة</Text>
                    </Col>
                    <Col sm={{ span: 12 }} md={{ span: 14 }}>
                        <Text color="#fff" as="h1">Shoppy</Text>
                        <Text color="#fff" as="p" padding={[0, 0, 0, 50]}>توفر منصة Shoppy للتجارة الإلكترونية للشركات جميع الأدوات والخدمات المهنية التي يحتاجونها للبيع عبر الإنترنت وفي المتجر.</Text>
                    </Col>
                </Row>
            </Container>
        </FooterStyle>
    );
}
