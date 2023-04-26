import { DeleteOutlined, PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Form, InputNumber, Row, Button, Skeleton, Radio, Space, Input, Alert, Upload, UploadProps, message } from "antd";
import CardComponent from "components/elements/card/card";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { currencyFormatter } from "helpers/money-formet";
import pointsSite from "points.site";
import axiosConfig from "services/api";
import Swal from "sweetalert2";
import { GiEntryDoor } from "react-icons/gi";
import { BsCreditCard2Front } from "react-icons/bs";
import { CartBuyOptionsStyle } from "./cart-style";
import React, { useState } from "react";
import { InWebSettingContextProps, WebSettingContext } from "contexts/web-setting";
import points from "points";

interface Props {
    id: number,
    count: number,
    orderItems: [
        {
            id: number,
            count: number,
            title: string,
            price: number,
            disacount: number,
            description: string,
            categoryName: string,
            slug: number
        }
    ],
    price: number,
    disacount: number,
    priceDisacount: number
}

const props: UploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }: any) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    }

};

function CartSecondStpe({ data, next, prev }: { data: Props, next: any, prev: any }) {
    const [buyMethod, setBuyMethod] = useState<string>("havala");
    const [eftFile, setEftFile] = useState("");
    const { generalData } = React.useContext<InWebSettingContextProps>(WebSettingContext)
    const confirmOrder = () => {
        axiosConfig()
            .post(pointsSite.custumerSite_confirmOrder, { ...data, eftFile })
            .then((res) => {
                Swal.fire({
                    title: "تمت الطلبية بنجاح",
                    icon: "success",
                })
            });
    }

    const changeBuyMethod = (e: any) => {
        setBuyMethod(e.target.value);
    };

    const uploadImage: UploadProps["customRequest"] = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        fmData.append("file", file);
        try {
            const res = await axiosConfig().post(
                points.sendEft,
                fmData,
                config
            );
            onSuccess && onSuccess({ name: res.data });
            setEftFile(res.data);
            // if (multiple) {
            //   const oldImageName = form.getFieldValue("imageNames");
            //   console.info("oldImageNames : ", oldImageName);
            //   let images =
            //     oldImageName &&
            //     oldImageName.fileList?.map((item: any, index: number) => {
            //       console.info("images: ", item);
            //       return item.response?.name;
            //     });
            //   form.setFieldValue("imageNames", images);
            // } else {
            //   form.setFieldValue("mainImageName", res.data);
            // }
        } catch (err: any) {
            onError && onError(err);
        }
    };
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col md={{ span: 18 }}>
                    <CardComponent title="خيارات الدفع">
                        <CartBuyOptionsStyle as="div" justifyContent={"center"}>
                            <Radio.Group onChange={changeBuyMethod} options={
                                [
                                    {
                                        label: (
                                            <FlexDiv noFlex={true} padding={[15, 0]}>
                                                <Text align="center" className="icon" color="#2b2b2bb8" size={40} as="div">
                                                    <GiEntryDoor />
                                                </Text>
                                                <Text className="text" align="center" as="div">
                                                    الدفع عند التسليم
                                                </Text>
                                            </FlexDiv>
                                        )
                                        , value: 'onHouse'
                                    },
                                    {
                                        label: (
                                            <FlexDiv noFlex={true} padding={[15, 0]}>
                                                <Text className="icon" align="center" color="#2b2b2bb8" size={40} as="div">
                                                    <BsCreditCard2Front />
                                                </Text>
                                                <Text className="text" align="center" as="div">
                                                    حوالة
                                                </Text>
                                            </FlexDiv>
                                        )
                                        , value: 'havala'
                                    },
                                    // {
                                    //     label: (
                                    //         <FlexDiv noFlex={true} padding={[15, 0]}>
                                    //             <Text className="icon" align="center" color="#2b2b2bb8" size={40} as="div">
                                    //                 <BsCreditCard2Front />
                                    //             </Text>
                                    //             <Text className="text" align="center" as="div">
                                    //                 الدفع عن طريق البنك
                                    //             </Text>
                                    //         </FlexDiv>
                                    //     )
                                    //     , value: 'onCredit'
                                    // },
                                ]} defaultValue="havala" optionType="button" />
                        </CartBuyOptionsStyle>
                        <Form
                            name="complex-form"
                            layout="vertical"
                            style={{ maxWidth: 400, margin: "30px auto" }}
                        >
                            {
                                buyMethod === "havala" ? (
                                    <>
                                        <Alert style={{ marginBottom: 15 }} type="warning" message={<>
                                            <Text as="b">  يرجى أرسال المال الى هذا الحساب وأرسال الملف الينا لأكمال الطلبية</Text>
                                            <Text margin={[8, 0, 0, 0]} as="p">{generalData?.company?.cardIban}</Text>
                                            <Text margin={[0, 0, 0, 0]} as="p">{generalData?.company?.cardName}</Text>
                                        </>} />
                                        <Form.Item name="file"></Form.Item>
                                        <Upload customRequest={uploadImage}
                                            beforeUpload={(file) => {
                                                const isLt1M = file.size / 1024 / 1024 < 1;
                                                if (!isLt1M) {
                                                    message.error("يجب أن يكون حجم الصورة أقل من 1 ميغا بايت!");
                                                }

                                                return isLt1M;
                                            }} {...props}>
                                            <Button icon={<UploadOutlined />}>تحميل ملف الأيصال</Button>
                                        </Upload>
                                    </>
                                ) : ""
                            }
                        </Form>
                    </CardComponent>
                    <CardComponent title="العنوان">
                        <Text as="p" color="#615b5b" padding={15}>Turkey Şanlıurfa büyükşehir haliliye </Text>
                    </CardComponent>
                </Col>
                <Col md={{ span: 6 }}>
                    <FlexDiv noFlex={true} radius={10} bg="#fff" cstyle={`
                        border-radius: 10px;
                    `} padding={[5, 10]}>
                        <FlexDiv
                            dir="rtl"
                            justifyContent="space-betwenn"
                        >
                            <Text as="h3" bold={400} margin={[5, 0, 10]}>المبلغ المستحق دفعه</Text>
                        </FlexDiv>
                        <FlexDiv
                            margin={[10, 0]}
                            dir="rtl"
                            justifyContent="space-between"
                        >
                            <Text >أجور الشحن</Text>
                            <Text bold="bold" color="#605e5e">{currencyFormatter(0)}</Text>
                        </FlexDiv>
                        <FlexDiv
                            margin={[10, 0, 40]}
                            dir="rtl"
                            justifyContent="space-between"
                        >
                            <Text>مجموع</Text>
                            <Text bold="bold" color="#605e5e">{currencyFormatter(data.price
                            )}</Text>
                        </FlexDiv>
                        <FlexDiv
                            dir="rtl"
                            justifyContent="space-betwenn"
                        >
                            <Text as="h3" bold={400} margin={[5, 0, 10]}>موقع التسليم</Text>
                        </FlexDiv>
                        <FlexDiv
                            dir="rtl"
                            justifyContent="space-betwenn"
                        >
                            <Text as="h4" bold={400} margin={[5, 0, 10]}>Şanlıurfa Haliliye 2231 14:3</Text>
                        </FlexDiv>
                        <Button style={{ marginTop: 15 }} block type="primary" onClick={confirmOrder} htmlType="button" >أتمام الطلب</Button>
                    </FlexDiv>
                </Col>
            </Row>
        </>
    );
}

export default CartSecondStpe;