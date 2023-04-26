import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import CustomImage from "components/utils/c-image";
import styled from "styled-components";
import ImagesRandom from "data/images/image";

interface Props {
  image: string;
  imageNames: string[];
}

const SwiperStyle = styled(Swiper)`
    margin-left: auto;
    margin-right: auto;

    .swiper-slide 
    {
      border: 1px solid #eee9e9;
      &>div{
      width:100%;
      height: 100%;
      }
    }
`;

export default function ProductImgDetay(props: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <SwiperStyle
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {ImagesRandom &&
          ImagesRandom.map((item: string, index: number) => {
            if (index > 2) return "";
            return (
              <SwiperSlide key={index}>
                <div style={{
                  height: "80%",
                  width: "80%",
                  margin: "auto"
                }}>
                  <CustomImage
                    // src={process.env.NEXT_PUBLIC_BASE_DOMIN + item}
                    src={ImagesRandom[index]}
                    layout="responsive"
                    imgWidth="100%"
                    imgHeight="100%"
                  />
                </div>
              </SwiperSlide>
            )
          })}
      </SwiperStyle>
      <SwiperStyle
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {ImagesRandom &&
          ImagesRandom.map((item: string, index: number) => {
            if (index > 5) return ""
            return (
              <SwiperSlide key={index}>
                <div>
                  <CustomImage
                    src={ImagesRandom[index]}
                    // src={process.env.NEXT_PUBLIC_BASE_DOMIN + item}
                    layout="fill"
                    width={100}
                    height={100}
                  // imgWidth="100%"
                  // imgHeight="100%"
                  />
                </div>
              </SwiperSlide>
            )
          })}
      </SwiperStyle>
    </>
  );
}
