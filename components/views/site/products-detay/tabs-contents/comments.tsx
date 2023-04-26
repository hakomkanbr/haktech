import { Avatar, Button, Card, Form, Input, notification, Rate } from "antd";
import FlexDiv from "components/utils/flex-div";
import ContentType from "types/products";
const desc = ['(سيء)', '(جيد)', '(جميل)', '(رائع)', '(رهيب)'];
import { useCallback, useState } from "react";
import axiosConfig from 'services/api';
import pointsSite from "points.site";
import { useRouter } from "next/router";
import Text from "components/utils/text";


const CommentsTab = ({ data }: { data: ContentType }) => {
    const [value, setValue] = useState(1);
    const [showForm, setShowForm] = useState<boolean>(false);
    const router = useRouter();
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const onFinish = useCallback(async (values: any) => {
        console.info("values : ", values);
        const fetch = await axiosConfig().post(`${pointsSite.custumerSite_Comment}?slug=${router.query["product-slug"]}&rate=${values?.rate}&comment=${values.comment}`, {
            ProductSlug: router.query["product-slug"],
            CategorySlug: router.query["category-slug"],
            CompanySlug: router.query["company-slug"],
            ...values
        });
        notification.success({
            message: "شكرا على التعليق",
            placement: "topRight"
        });
        setShowForm(false)
    }, []);
    return (
        <>
            {
                data.comments && data.comments?.length ? data.comments?.map((item: any, index: number) => (
                    <Card key={index} style={{ marginTop: 16 }} >
                        <Card.Meta
                            title={
                                <FlexDiv justifyContent="space-between">
                                    <div>
                                        <b>{item.name ?? "virtual name"}</b>
                                    </div>
                                    <div>
                                        <span>
                                            <Rate disabled style={{
                                                fontSize: 14
                                            }} tooltips={desc} onChange={setValue} value={item.rate} />
                                            {/* {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''} */}
                                        </span>
                                    </div>
                                </FlexDiv>
                            }
                            description={item.comment}
                        />
                    </Card>
                )) : <Text as="p">لا توجد تعليقات حتى الآن</Text>
            }
            {
                showForm ? (
                    <Form
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        style={{ maxWidth: 600, margin: "40px auto" }}
                    >
                        <Form.Item
                            name="comment"
                            label="العنوان"
                            hasFeedback
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="العنوان" />
                        </Form.Item>
                        <Form.Item name="rate" label="تقييمك">
                            <Rate allowHalf={false} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                أرسال
                            </Button>
                            <Button type="dashed" style={{ margin: "0 15px" }} onClick={() => {
                                setShowForm(false)
                            }}>
                                الغاء
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Button type="primary" style={{ marginTop: 10 }} onClick={() => {
                        setShowForm(!showForm)
                    }}>أضافة تعليق </Button>
                )
            }
        </>
    );
};

export default CommentsTab;
