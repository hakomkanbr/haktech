import Container from "components/utils/container";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";
import CustomImage from "components/utils/c-image";
import { BannerStyle } from "./style";
import { Col, Row, Tag } from "antd";

export default function CoBanner() {
    const pagination = {
        clickable: true,
        // renderBullet: function (index: number, className: string) {
        //     return (<Tag title={index + 1} />);
        // },
    };
    return (
        <BannerStyle>
            <Container>
                <Row gutter={[6, 6]}>
                    <Col sm={{ span: 18 }}>
                        <Swiper
                            pagination={pagination}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <CustomImage layout="fill" width={500} height={500} src="http://magento2.magentech.com/themes/sm_shopping/pub/media/wysiwyg/slideshow/home-1/item-1.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomImage layout="fill" width={500} height={500} src="http://magento2.magentech.com/themes/sm_shopping/pub/media/wysiwyg/slideshow/home-1/item-2.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CustomImage layout="fill" width={500} height={500} src="http://magento2.magentech.com/themes/sm_shopping/pub/media/wysiwyg/slideshow/home-1/item-3.jpg" />
                            </SwiperSlide>
                        </Swiper>
                    </Col>
                    <Col sm={{ span: 6 }}>
                        <Row>
                            <Col sm={{ span: 24 }} style={{ padding: "0 0 5px 0" }}>
                                <SwiperSlide>
                                    <CustomImage layout="fill" width={200} height={250} src="http://magento2.magentech.com/themes/sm_shopping/pub/media/wysiwyg/banner/banner-3.jpg" />
                                </SwiperSlide>
                            </Col>
                            <Col sm={{ span: 24 }}>
                                <SwiperSlide>
                                    <CustomImage layout="fill" width={200} height={245} src="http://magento2.magentech.com/themes/sm_shopping/pub/media/wysiwyg/banner/banner-4.jpg" />
                                </SwiperSlide>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </BannerStyle>
    );
}
