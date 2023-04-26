import { Button } from "antd";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { BannerStyle } from "./style";

export default function CoBanner() {
    return (
        <BannerStyle>
            <Container>
                <FlexDiv>
                    <FlexDiv width="22%"></FlexDiv>
                    <Text style={{ width: "68%" }} as="h1" size={50} align="center">إنشاء موقع التجارة الإلكترونية ، وإدارة أعمال التجارة الإلكترونية الخاصة بك</Text>
                    <FlexDiv width="22%"></FlexDiv>
                </FlexDiv>
                <FlexDiv justifyContent="center">
                    <Text style={{ width: "40%" }} size={16} as="p" align="center">
                        استفد من أدوات Applighterz القوية والمتقدمة لبناء موقع تجارة إلكترونية ناجح.
                    </Text>
                </FlexDiv>
                <FlexDiv justifyContent="center">
                    <Button onClick={() => {
                        window.open(`https://api.whatsapp.com/send?phone=+972509599989&text=مرحبا , هل يمكنني معرفة المزيد عن خدمتكم`)
                    }} htmlType="button" className="btn1" type="primary">أطلب متجرك الأن</Button>
                    <Button htmlType="button" onClick={() => {
                        alert("هذه الخدمة جاري تحديثها")
                    }} className="btn2" type="default">أراء عملائنا</Button>
                </FlexDiv>
            </Container>
        </BannerStyle>
    );
}
