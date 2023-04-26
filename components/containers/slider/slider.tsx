// Import Swiper React components
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";
import { SwiperStyle, SlideItemSyle } from "./slider.style";
import CustomImage, { imgLoader } from "components/utils/c-image";
import Text from "components/utils/text";
import theam from "config/theam";
import { Button, notification, Rate, Skeleton } from "antd";
import categoriesType from "types/categories";
import ContentType from "types/products";
import FlexDiv from "components/utils/flex-div";
import Link from "next/link";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import getTypeByEnum from "helpers/getItemByEnum";
import ImagesRandom from "../../../data/images/image";
import { currencyFormatter } from "helpers/money-formet";
import axiosConfig from "services/api";
import pointsSite from "points.site";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "redux/web/cart-slice";

const changeFavorite = (e: any, slug?: string, categorySlug?: string, companySlug?: string) => {
  var element = e.parentElement;
  var checkClassName = element.className;
  var elementName = element.tagName;
  if (elementName === "svg") return false;
  axiosConfig()
    .post(pointsSite.custumerSite_favorite + "?slug=" + slug, {
      "ProductSlug": slug,
      "CategorySlug": categorySlug,
      "CompanySlug": companySlug
    })
    .then(() => {
      if (checkClassName === "favorite red") {
        element.className = "favorite white";
      } else {
        element.className = "favorite red";
      }
    }).catch((err) => {
      alert("err");
    });


}

export default function SlidePhoto({ data }: { data: categoriesType }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const addOrderItem = async (item: ContentType) => {
    dispatch(addToCart(item));
    notification.success({
      message: "تمت أضافة المنتج بنجاح",
      placement: "top",
    });
  };
  return (
    <div
      style={{
        margin: "30px 0",
      }}
    >
      <Text as="div" margin={[10, 0]} size="large">
        {data.name}
      </Text>
      <Text as="div" margin={[10, 0]} size="normal">
        {data.description}
      </Text>
      <SwiperStyle
        spaceBetween={10}
        dir="rtl"
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          425: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 7,
          },
          1350: {
            slidesPerView: 7,
          },
          1750: {
            slidesPerView: 10,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      // modules={[Grid, Pagination]}
      >
        {data?.products?.map((item: ContentType, index: number) => (
          <SwiperSlide key={index}>
            <SlideItemSyle>
              <div className="head-actions">
                {item.categorySlug}
                <div onClick={(e) => { changeFavorite(e.target, item.slug, item.categorySlug, router.query["company-slug"] as string) }} className={`favorite ${item.favorited === true ? "red" : "white"}`}><MdOutlineFavoriteBorder /></div>
              </div>
              <Link
                href={{
                  pathname:
                    "/[slug]/[company-slug]/[category-slug]/[product-slug]",
                  query: {
                    slug: getTypeByEnum(data.companyType),
                    "company-slug": data.companySlug,
                    "category-slug": data.slug,
                    "product-slug": item.slug,
                  },
                }}
              >
                <a>
                  <div className="header">
                    {item.mainPhoto ? (
                      <CustomImage
                        loader={imgLoader}
                        imgWidth={100}
                        imgHeight={100}
                        src={`/api/Services/GetPhoto?id=4&folder=1&name=${item.mainPhoto}`}
                      />
                    ) : (
                      <CustomImage
                        test={true}
                        loader={({ src }: any) => src}
                        imgWidth={100}
                        imgHeight={100}
                        src={ImagesRandom[index]}
                      />
                      // <Skeleton.Image
                      //   style={{
                      //     width: "100%!important",
                      //     height: "100%",
                      //   }}
                      // />
                    )}
                      <div className="actions">
                <Button onClick={() => {
                  addOrderItem(item);
                }} type="text" >أضف الى السلة</Button>
              </div>
                  </div>
                  <div className="content">
                    <Text
                      as="h5"
                      size={12}
                      margin={[5, 0]}
                      color={theam.colors.black}
                    >
                      {item.title}
                    </Text>
                    <Text
                      as="p"
                      cstyle={`
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2; /* start showing ellipsis when 3rd line is reached */
                        white-space: pre-wrap; /* let the text wrap preserving spaces */
                      `}
                      size={12}
                      margin={[0]}
                      color={theam.colors.grey}
                    >
                      {item.description}
                    </Text>
                    <Text as="div" color={theam.colors.black}>
                      <Rate
                        disabled
                        style={{ fontSize: 13 }}
                        defaultValue={item.rate}
                      />
                    </Text>
                    <FlexDiv
                      direction="row-reverse"
                      margin={[10, 5, 0]}
                      alignItems="center"
                    >
                      {item.discount && (
                        <Text
                          bold="bold"
                          as="span"
                          margin={[5]}
                          align="left"
                          size={12}
                        >
                          <del>${item.discount}</del>
                        </Text>
                      )}
                      <Text
                        color={theam.colors.orange}
                        as="span"
                        bold="bold"
                        size={16}
                      >
                        {currencyFormatter(item.price)}
                      </Text>
                    </FlexDiv>
                  </div>
                </a>
              </Link>
            
            </SlideItemSyle>
          </SwiperSlide>
        ))}
      </SwiperStyle>
    </div>
  );
}
