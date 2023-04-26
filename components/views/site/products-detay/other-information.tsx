import { Button, message, notification, Popover, Rate, Tag } from "antd";
import ContentType from "types/products";
import Text from "components/utils/text";
import theam from "config/theam";
import FlexDiv from "components/utils/flex-div";
import { useDispatch } from "react-redux";
import { useCallback, useContext, useState } from "react";
import { CustumerContext } from "contexts/custumer-context";
import { currencyFormatter } from "helpers/money-formet";
import axiosConfig from "services/api";
import pointsSite from "points.site";
import ReviewTab from "./tabs-contents/review";
import { DownOutlined } from "@ant-design/icons";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useRouter } from "next/router";
import { addToCart } from "redux/web/cart-slice";

const OtherInformation = ({ data }: { data: ContentType }) => {
  const custumerContext = useContext(CustumerContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const [favorited, setFavorited] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const addToCard = async () => {
    dispatch(addToCart(data));
    notification.success({
      message: "تمت أضافة المنتج بنجاح",
      placement: "top",
    });
  };

  const addFavorite = useCallback(async (slug?: string) => {
    await axiosConfig()
      .post(pointsSite.custumerSite_favorite, {
        "ProductSlug": slug,
        "CategorySlug": router.query["category-slug"],
        "CompanySlug": router.query["company-slug"]
      })
      .then(() => {
        setFavorited(true)
      }).catch((err) => {
        alert("err");
      });
  }, [data, router]);

  return (
    <>
      <Text as="div" size="large">
        {data.title} <Tag color={theam.colors.orange}>{data.categoryName}</Tag>
      </Text>
      <Text as="div" margin={[5, 0]} color={theam.colors.black}>
        <Popover overlayStyle={{ background: "#ffffff00!important", boxShadow: "none!important", width: 300 }} content={<ReviewTab data={data} />} trigger="click">
          <DownOutlined style={{ fontSize: 14, fontWeight: "bold", position: "relative", top: "2px", "left": "2px", color: "grey" }} />
        </Popover>
        <Rate disabled style={{ fontSize: 14 }} defaultValue={3 ?? data.rate} />
        <span className="ant-rate-text">{data.rateCount} المراجعات</span>
      </Text>
      <FlexDiv direction="row-reverse" margin={[5]} alignItems="center">
        {data.discount && (
          <Text bold="bold" as="span" margin={[5]} align="left" size={12}>
            <del>${data.discount}</del>
          </Text>
        )}
        <Text color={theam.colors.orange} as="span" bold="bold" size={20}>
          {currencyFormatter(data.price)}
        </Text>
        <Tag color="blue" style={{ margin: "0 10px" }}>الكمية مفتوحة</Tag>
      </FlexDiv>
      <FlexDiv direction="row-reverse" margin={[5]} alignItems="center">
        <Button type="default" onClick={() => { addFavorite(data.slug) }} icon={<MdOutlineFavoriteBorder color={favorited ? "red" : "grey"} />} ></Button>
        <Button style={{ margin: "20px" }} onClick={() => { addToCard() }} type="primary">
          أضف الى السلة
        </Button>
      </FlexDiv>
      <Text as="div" margin={[5, 0]} size={13}>
        {data.description}
      </Text>
    </>
  );
};

export default OtherInformation;
