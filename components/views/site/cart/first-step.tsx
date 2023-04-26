import { DeleteOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Avatar,
    Card,
    Col,
    Form,
    InputNumber,
    Row,
    Space,
    Button,
    Input,
    Radio,
    Divider,
    InputRef,
} from "antd";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { currencyFormatter } from "helpers/money-formet";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useCallback } from "react";
import axiosConfig from "services/api";
import pointsSite from "points.site";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import CollectionCreateForm from "components/elements/modal/modal-create-edit";
import fetchDataSelect from "helpers/fetch-data-select";
import AdresSelect from "components/elements/select/select-fetch-adres";
import InAddressSelectType from "types/addres-select-type";

interface PropsOrder {
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

export interface Props {
    order: PropsOrder,
    status: boolean
}

const CardStyle = styled(Space)`
    display:flex;
    margin:10px 0;
    .ant-space-item{
        width:100%;
    }
    .ant-card-body{
        .ant-form-item{
            margin: 0!important;
        }
        display: flex;
        justify-content: space-between;
        &>div{
            display: flex;
            align-items: center;
        }
        &>div:nth-of-type(1){
            width: 100%;
        }
        &>div:nth-of-type(2){
            width: 100%;
            justify-content: center;
        }
        &>div:nth-of-type(3){
            justify-content: end;
            width: 100%;
            font-weight: bold;
        }
    }
`;

function CartFirstStpe({ data, next, prev }: { data: Props, next: any, prev: any }) {
    const [form] = Form.useForm();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const changeValues: any[] = Form.useWatch("orderItems", form);
    const [toplam, setToplam] = useState<number | string>(0);
    const [addressModalOpen, setAddressModalopen] = useState<boolean>(false);
    const [createAddressModalOpen, setCreateAddressModalOpen] = useState<boolean>(false);
    const [addressData, setAddressData] = useState(null);
    const [adresId, setAdresId] = useState<any>();
    const [name, setName] = useState('');
    const [count, setCount] = useState<number[]>([]);
    const inputRef = useRef<InputRef>(null);
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addNewAdres = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setCreateAddressModalOpen(true);
    };
    const checkOrder = useCallback(async () => {
        const values: any = {
            id: data.order.id,
            "locationId": adresId,
            "items": changeValues ? changeValues?.map((item, index) => ({
                id: item?.id,
                "price": item?.price,
                "count": item?.count
            })) : data.order.orderItems?.map((item: any, index) => ({
                id: item?.id,
                "price": item?.price,
                "count": item?.count
            })),
            "companySlug": router.query["company-slug"],
            "payMethod": "OnADoor",
            "eftFile": "filetest"
        };
        if (data.order.id != 0) {
            values["id"] = data.order.id;
        }
        const response: any = await axiosConfig().post(pointsSite.custumerSite_checkOrder,
            values
        );
        const resData = await response.data;
        var summary: number = 0;
        var hasError: string[] = [];

        var newChangeValues = changeValues ? changeValues : data.order.orderItems;
        for (let index = 0; index < newChangeValues?.length; index++) {
            summary = summary + (newChangeValues[index].count * newChangeValues[index].price);
            // test için (sonra silinecek..)
            if (
                newChangeValues[index].count != resData.orderItems[index].count ||
                newChangeValues[index].id != resData.orderItems[index].id ||
                newChangeValues[index].price != resData.orderItems[index].price ||
                newChangeValues[index].slug != resData.orderItems[index].slug
            ) {
                // hasError.push(`يوجد خطأ في المنتج الذي يحتوي على (id : ${newChangeValues[index].id}) `);
            }
        }

        if (hasError.length > 0) {
            Swal.fire({
                title: "يوجد خطأ في الطلبية",
                icon: "error",
                html: hasError.join("\n")
            })
        } else if (resData.price === summary) {
            next({ ...values, ...resData });
        } else {
            next({ ...values, ...resData });
        }
    }, [adresId]);
    const onFinishCreateAddres = useCallback(async (values: InAddressSelectType) => {
        try {
            setLoading(true)
            await axiosConfig().post(pointsSite.custumerSite_addUpdateUserLocation, { ...values });
            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(false);
        } finally {
            setLoading(false);
            setCreateAddressModalOpen(false);
        }
    }, []);
    useEffect(() => {
        var summary: number = 0;
        const arrCount = [];
        for (let index = 0; index < changeValues?.length; index++) {
            arrCount.push(changeValues[index].count);
            summary = summary + (changeValues[index].count * changeValues[index].price);
        }
        setCount(arrCount)
        form.validateFields(["orderItems"])
        setToplam(currencyFormatter(summary));
    }, [changeValues]);
    useEffect(() => {
        if (addressModalOpen === true && addressData != null) {
            axiosConfig()
                .post(pointsSite.custumerSite_getUserLocation)
                .then((res) => {
                    setAddressData(res.data);
                })
        }
    }, [addressModalOpen]);
    const decrement = useCallback(async (e: any, key: any,) => {
        const values = form.getFieldValue("orderItems");
        const item = values.filter((y: any, i: number) => i === key);
        try {
            if (item.length && count[key] < item[0].count) {
                await axiosConfig().post(pointsSite.custumerSite_AddOrderItem, {
                    "ProductSlug": item[0]?.slug,
                    "CategorySlug": item[0]?.categorySlug,
                    "CompanySlug": router.query["company-slug"]
                })
            } else if (item.length && count[key] > item[0].count) {
                await axiosConfig().post(pointsSite.custumerSite_DecrementOrderItem, {
                    "ProductSlug": item[0]?.slug,
                    "CategorySlug": item[0]?.categorySlug,
                    "CompanySlug": router.query["company-slug"]
                })
            }
        } catch (err) {
        }
    }, [count]);

    return (
        <>
            <Form form={form} name="card-form" initialValues={{
                orderItems: data?.order?.orderItems
            }} onFinish={checkOrder} autoComplete="off">
                <Row gutter={[16, 16]}>
                    <Col md={{ span: 18 }}>
                        <Form.List name="orderItems">
                            {(fields, { add, remove }) => (
                                <>
                                    {
                                        fields.map(({ key, name, ...restField }) => (
                                            <CardStyle key={key}>
                                                <Card loading={false}>
                                                    <Card.Meta avatar={<Avatar size="large" shape="square" src={"https://cdn.getiryemek.com/cuisines/1650791972868_480x300.jpeg"} />}
                                                        title={data?.order?.orderItems[key]?.title}
                                                        description={data?.order?.orderItems[key]?.description}
                                                    />
                                                    <div>
                                                        <Button style={{
                                                            "margin": "0 10px",
                                                        }} onClick={() => {
                                                            Swal.fire({
                                                                title: "هل أنت متأكد من أنه تريد أزالة هذا المنتج من العربة",
                                                                confirmButtonText: "نعم",
                                                                showCancelButton: true,
                                                                cancelButtonText: "لا"
                                                            }).then((res) => {
                                                                remove(name);
                                                                axiosConfig().post(pointsSite.custumerSite_RemoveOrderItem, {
                                                                    "ProductSlug": changeValues[key]?.slug,
                                                                    "CategorySlug": changeValues[key]?.categorySlug,
                                                                    "CompanySlug": router.query["company-slug"]
                                                                })
                                                            })
                                                        }} icon={<DeleteOutlined />} />
                                                        <Form.Item {...restField} name={[name, "count"]} >
                                                            <InputNumber size="large" onChange={(e) => { decrement(e, key) }} min={1} max={10} defaultValue={1} />
                                                        </Form.Item>
                                                    </div>
                                                    <div>{currencyFormatter(changeValues ? changeValues[key]?.price * changeValues[key]?.count : 0)}</div>
                                                </Card>
                                            </CardStyle>
                                        ))
                                    }
                                </>
                            )}
                        </Form.List>
                    </Col>
                    <Col md={{ span: 6 }}>
                        <FlexDiv noFlex={true} radius={10} bg="#fff" cstyle={`
                        border-radius: 10px;
                    `} padding={[5, 10]}>
                            <FlexDiv
                                dir="rtl"
                                justifyContent="space-betwenn"
                            >
                                <Text as="h3" bold={400} margin={[5, 0, 10]}>إجمالي سلة التسوق</Text>
                            </FlexDiv>
                            <FlexDiv
                                margin={[10, 0]}
                                dir="rtl"
                                justifyContent="space-between"
                            >
                                <Text >المجموع الفرعي</Text>
                                <Text bold="bold" color="#605e5e">{toplam}</Text>
                            </FlexDiv>
                            <FlexDiv
                                margin={[10, 0, 40]}
                                dir="rtl"
                                justifyContent="space-between"
                            >
                                <Text>مجموع</Text>
                                <Text bold="bold" color="#605e5e">{toplam}</Text>
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
                                <AdresSelect
                                    style={{
                                        width: "100%",
                                    }}
                                    placeholder="أختر العنوان"
                                    value={adresId}
                                    onChange={(newValue) => {
                                        setAdresId(newValue as InAddressSelectType[]);
                                    }}
                                    fetchOptions={fetchDataSelect}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Button type="text" icon={<PlusOutlined />} onClick={addNewAdres}>
                                                    أضف عنوان جديد
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                />
                            </FlexDiv>
                            <Button style={{ marginTop: 15 }} block type="primary" htmlType="submit" >شراء</Button>
                        </FlexDiv>
                    </Col>
                </Row>
            </Form>
            <CollectionCreateForm
                title="موقع جديد"
                open={createAddressModalOpen}
                onCreate={onFinishCreateAddres}
                loading={loading}
                onCancel={() => {
                    setCreateAddressModalOpen(false);
                }}>
                <Divider orientation="left"> معلومات المتلقي</Divider>
                <Form.Item name="name" label="الأسم المتلقي">
                    <Input placeholder="الأسم الأول" />
                </Form.Item>
                <Form.Item name="phoneNo" label="رقم التلفون">
                    <Input placeholder="رقم التلفون" />
                </Form.Item>
                <Divider orientation="left"> معلومات عنوانك</Divider>
                <Form.Item name="country" label="البلد">
                    <Input placeholder="البلد" />
                </Form.Item>
                <Form.Item name="city" label="المدينة">
                    <Input placeholder="المدينة" />
                </Form.Item>
                <Form.Item name="address" label="العنوان">
                    <Input placeholder="العنوان" />
                </Form.Item>
                <Form.Item name="addressName" rules={[{
                    required: true
                }]} label="أعط هذا العنوان اسم">
                    <Input placeholder="أعط هذا العنوان اسم.." />
                </Form.Item>
            </CollectionCreateForm>
        </>
    );
}

export default CartFirstStpe;