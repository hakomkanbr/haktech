import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Badge, Button, Col, Descriptions, Divider, Image, message, Row, Table } from 'antd';
import CardComponent from 'components/elements/card/card';
import TableBasic from 'components/elements/table/table';
import ColumnEnum from 'enums/columns.enum';
import points from 'points';
import route_paths from 'paths';
import Text from 'components/utils/text';
import FlexDiv from 'components/utils/flex-div';
import axiosConfig from 'services/api';
import { useRouter } from 'next/router';
import { currencyFormatter } from 'helpers/money-formet';
import Link from 'next/link';
import { MdOutlineEmail } from 'react-icons/md';
import { PhoneOutlined } from '@ant-design/icons';
import moment from 'moment';

const initialdata = {
    "id": 10,
    custumer: {
        id: "1",
        "name": "custumer3",
        "phoneNumber": "455454",
        imageName: "https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg",
        "email": "Custumer3@mail.com",
    },
    "date": "22.03.2022",
    "price": 1188.5924432441307,
    "code": "VZ_10",
    "products": [
        {
            "id": 1,
            "slug": "pr20",
            "CategoryName": "تكنلوجيا",
            "title": "لابتوب",
            "mainImageName": "https://themesbrand.com/velzon/html/default/assets/images/products/img-8.png",
            "price": 942.626935488994,
            "quantity": "1",
            "total": 13131,
        },
        {
            "id": 1,
            "slug": "pr20",
            "CategoryName": "أثاث",
            "title": "طاولات",
            "mainImageName": "https://themesbrand.com/velzon/html/default/assets/images/products/img-8.png",
            "price": 942.626935488994,
            "quantity": "1",
            "total": 13131,
        }
    ],
    "currency": "TRY",
    subTotal: 321,
    disCount: 321,
    shippingCharge: 12,
    tax: 42,
    total: 21,
    payMethodOptios: {
        "payMethod": "OnADoor",
        code: "VLZ124561278124",
        name: "Joseph Parker",
        cardNumber: "xxxx xxxx xxxx 2456",
        total: 415.96
    },
    adres: {
        "adressId": 2,
        "adressName": "الأسم المتلقي",
        "adressAddress": "العنوان",
        "adressAddressName": "adres 1",
        "adressCity": "المدينة",
        "adressCountry": "البلد",
        "adressPhoneNo": "رقم التلفون",
    },
    "state": "Sended",
    "received": false,
    "rejected": false,
    "sended": true,
    "productCount": 2,
}

const columns = [
    {
        title: "تفاصيل المنتج",
        dataIndex: "title",
        render: (data: any, full: any) => {
            return (
                <FlexDiv>
                    {
                        full["mainImageName"] ? (
                            <Image src={full["mainImageName"]} width={100} height={80} alt="product Img" />
                        ) : ""
                    }
                    <div>
                        <Text as="h5" margin={0} size={15} color='#405189'>{data} ({full["categoryName"]})</Text>
                        <Text as="p" margin={[5, 0, 0, 0]} size={13} color='#878a99'>Color: white</Text>
                        <Text as="p" margin={0} size={13} color='#878a99'>Size: 32.5mm</Text>
                    </div>
                </FlexDiv>
            )
        }
    },
    {
        title: "العدد",
        dataIndex: "quantity",
    },
    {
        title: "السعر",
        dataIndex: "price",
        render: (data: any, full: any) => {
            return currencyFormatter(data, "tr-TR");
        }
    },
    {
        title: "المجموع",
        dataIndex: "total",
        render: (data: any, full: any) => {
            return currencyFormatter(data, "tr-TR");
        }
    },
];
const OrderDetailsView: React.FC = () => {
    const [data, setData] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const fetch =
                await (await axiosConfig().post(points.getOrder + "?id=" + router.query["id"])).data;

            console.info("data : ", fetch);
            setData(fetch.data)
        }

        fetchData();
    }, [router.isReady]);

    const sendOrder = useCallback(() => {
        axiosConfig()
            .post(points.sendOrder + "?id=" + data.id)
            .then(res => {
                message.success("sendOrder success")
            }).catch((err) => {
                message.success("sendOrder error")
            })
    }, [data])
    const rejectOrder = useCallback(() => {
        axiosConfig()
            .post(points.rejectOrder + "?id=" + data.id)
            .then(res => {
                message.success("rejectOrder success")
            }).catch((err) => {
                message.success("rejectOrder error")
            })
    }, [data])
    const receiveOrder = useCallback(() => {
        axiosConfig()
            .post(points.receiveOrder + "?id=" + data.id)
            .then(res => {
                message.success("receiveOrder success")
            }).catch((err) => {
                message.success("receiveOrder error")
            })
    }, [data])


    return (
        <Row>
            <Col md={{ span: 24 }} style={{ padding: "0 15px", marginBottom: 10 }}>
                <Button onClick={sendOrder} style={{ background: "#50d941a6", color: "#fff", fontWeight: "500" }}>قبول الطلبية</Button>
                <Button onClick={rejectOrder} style={{ background: "rgb(245 48 48 / 62%)", color: "#fff", fontWeight: "500", margin: "0 5px" }}>رفض الطلبية</Button>
                <Button onClick={receiveOrder} type='primary'>receiveOrder</Button>
            </Col>
            <Col md={{ span: 6 }}>
                <CardComponent title="بيانات الدفع">
                    <FlexDiv
                        padding={[0, 15]}
                        margin={[0, 0]}
                        noFlex={true}
                        dir="rtl"
                        justifyContent="space-between"
                    >
                        <Text as="span" color="#878a99">المعاملات :</Text>
                        <Text as="span" margin={4} bold="400" color="black">{data?.payMethodOptios?.code}#</Text>
                    </FlexDiv>
                    <FlexDiv
                        padding={[0, 15]}
                        margin={[5, 0]}
                        noFlex={true}
                        dir="rtl"
                        justifyContent="space-between"
                    >
                        <Text as="span" color="#878a99">طريقة الدفع او السداد :</Text>
                        <Text as="span" margin={4} bold="400" color="black">{data?.payMethodOptios?.payMethod}</Text>
                    </FlexDiv>
                    {
                        data?.payMethodOptios?.payMethod === "OnADoor" ? "" : (
                            <>
                                <FlexDiv
                                    padding={[0, 15]}
                                    margin={[5, 0]}
                                    noFlex={true}
                                    dir="rtl"
                                    justifyContent="space-between"
                                >
                                    <Text as="span" color="#878a99">إسم صاحب البطاقة :</Text>
                                    <Text as="span" margin={4} bold="400" color="black">{data?.payMethodOptios?.name}</Text>
                                </FlexDiv>
                                <FlexDiv
                                    padding={[0, 15]}
                                    margin={[5, 0]}
                                    noFlex={true}
                                    dir="rtl"
                                    justifyContent="space-between"
                                >
                                    <Text as="span" color="#878a99">رقم البطاقة :</Text>
                                    <Text as="span" margin={4} bold="400" color="black">{data?.payMethodOptios?.cardNumber}</Text>
                                </FlexDiv>
                            </>
                        )
                    }

                    <FlexDiv
                        padding={[0, 15]}
                        margin={[5, 0]}
                        noFlex={true}
                        dir="rtl"
                        justifyContent="space-between"
                    >
                        <Text as="span" color="#878a99">المبلغ الإجمالي:</Text>
                        <Text as="span" margin={4} bold="400" color="black">{currencyFormatter(data?.payMethodOptios?.total, "tr-TR")}</Text>
                    </FlexDiv>
                </CardComponent>
                <CardComponent
                    title="تفاصيل العميل"
                    extra={
                        <Link href={route_paths.admin_users + "/detay?id=" + data?.custumer?.id}>عرض الصفحة الشخصية</Link>
                    }
                >
                    <FlexDiv padding={[0, 10]}>
                        {
                            data?.custumer?.imageName ? (
                                <Image src={data?.custumer?.imageName} width={70} height={70} alt="custumer Img" />
                            ) : ""
                        }
                        <div style={{ margin: "0 5px" }}>
                            <Text as="h5" margin={0} size={15} color='#405189'>{data?.custumer?.name}</Text>
                            <Text as="p" margin={[5, 0, 0, 0]} size={13} color='#878a99'>Custumer</Text>
                        </div>
                    </FlexDiv>
                    <Text as="h5" padding={[10, 15, 10, 0]} margin={0} size={14} color='#333'><MdOutlineEmail style={{ margin: "0px 3px", position: "relative", top: 2 }} />{data?.custumer?.email}</Text>
                    <Text as="h5" padding={[0, 15, 0, 0]} margin={0} size={14} color='#333'><PhoneOutlined style={{ margin: "0px 3px", position: "relative", top: 2 }} />{data?.custumer?.phoneNumber}</Text>
                </CardComponent>
                <CardComponent
                    title="عنوان الشحن"
                >
                    <Text as="h5" size={14} margin={[0, 15, 5]}>{data?.adres?.addressName}</Text>
                    <Text as="p" margin={[5, 15]}>{data?.adres?.address}</Text>
                    <Text as="p" margin={[5, 15]}>{data?.adres?.city}</Text>
                    <Text as="p" margin={[5, 15]}>{data?.adres?.country}</Text>
                    <Text as="p" margin={[5, 15]}>{data?.adres?.phoneNo}</Text>
                </CardComponent>
            </Col>
            <Col md={{ span: 18 }}>
                <CardComponent
                    title="تفاصيل الطلب"
                    extra={moment(data?.date).format("YYYY/MMDD HH:SS")}
                >
                    {/* <Descriptions style={{ padding: "0 15px" }}>
                        <Descriptions.Item label="اسم المستخدم">{data?.custumer?.name}</Descriptions.Item>
                        <Descriptions.Item label="الأيميل">{data?.custumer?.email}</Descriptions.Item>
                        <Descriptions.Item label="رقم التلفون">{data?.custumer?.phoneNumber}</Descriptions.Item>
                    </Descriptions> */}
                    <Image.PreviewGroup>
                        <Table pagination={false} columns={columns} dataSource={data?.products} />
                        <Row>
                            <Col sm={{ span: 4 }}>
                                <Text as="p" margin={[5, 5, 5]} bold="400">المجموع الفرعي</Text>
                                <Text as="p" margin={[5, 5, 5]} bold="400">الخصم</Text>
                                <Text as="p" margin={[5, 5, 5]} bold="400">رسوم الشحن</Text>
                                <Text as="p" margin={[5, 5, 5]} bold="400">الضريبة المقدرة</Text>
                                <Divider style={{ margin: "15px 0 0" }} />
                                <Text as="p" margin={[5, 5, 5]} bold="bold">الإجمالي ({data?.currency})</Text>
                            </Col>
                            <Col sm={{ span: 20 }} style={{ borderRight: "1px solid #80808047", padding: "0 15px" }}>
                                <Text as="p" margin={[5, 5, 5]} bold="400">{currencyFormatter(data?.subTotal, "tr-TR")}</Text>
                                <Text as="p" margin={[5, 5, 5]} bold="400">{currencyFormatter(data?.disCount, "tr-TR")}</Text>
                                <Text as="p" margin={[5, 5, 5]} bold="400">{currencyFormatter(data?.shippingCharge, "tr-TR")}</Text>
                                <Text as="p" margin={[5, 5, 5]} bold="400">{currencyFormatter(data?.tax, "tr-TR")}</Text>
                                <Divider style={{ margin: "15px 0 0" }} />
                                <Text as="p" margin={[5, 5, 5]} bold="bold">{currencyFormatter(data?.total, "tr-TR")}</Text>
                            </Col>
                        </Row>
                    </Image.PreviewGroup>
                </CardComponent>
            </Col>
        </Row>
    );
}

export default OrderDetailsView;