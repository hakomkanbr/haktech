import { HomeOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { OfferStyle } from "./style";

const { Panel } = Collapse;

export default function CoOfferCard() {
    return (
        <OfferStyle>
            <Text as="h1" margin={[0, 0, 8, 0]} align="center">ما هي عروضنا</Text>
            <Text as="p" margin={[0, 0, 30, 0]} size={16} align="center">كيف يعمل Shoppy</Text>
            <FlexDiv className="rows">
                <div>
                    <div className="icon">
                        <HomeOutlined />
                    </div>
                    <div className="title">
                        اختر أي منتجات
                    </div>
                    <div className="description">
                        Lorem ipsum dolor amet, consectetur adipiscing elited uspendisse varius enim
                    </div>
                </div>
                <div>
                    <div className="icon">
                        <HomeOutlined />
                    </div>
                    <div className="title">
                        اختر أي منتجات
                    </div>
                    <div className="description">
                        Lorem ipsum dolor amet, consectetur adipiscing elited uspendisse varius enim
                    </div>
                </div>
                <div>
                    <div className="icon">
                        <HomeOutlined />
                    </div>
                    <div className="title">
                        اختر أي منتجات
                    </div>
                    <div className="description">
                        Lorem ipsum dolor amet, consectetur adipiscing elited uspendisse varius enim
                    </div>
                </div>
            </FlexDiv>
        </OfferStyle>
    );
}
