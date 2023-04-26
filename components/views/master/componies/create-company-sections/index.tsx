import { Button, Form, Tabs } from "antd";
import points from "points";
import router_path from "paths";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import slugGenerator from "helpers/slug-generator";
import axiosConfig from "services/api";
import GeneralSection from "./general";
import PayOptionsSection from "./pay-options";
import styled from "styled-components";
import FlexDiv from "components/utils/flex-div";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const TabsStyle = styled(Tabs)`
    .ant-tabs-nav{
        background-color: white;
        border-radius: 6px;
    }
`;

const TabsCompanies: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = useCallback(async (values: any) => {
        values.slug = slugGenerator(values?.name ?? values?.title);
        values.userPhoneNumber = values?.userPhoneNumber?.number.toString() || null;
        if (values?.payMethod && Array.isArray(values.payMethod)) {
            for (let index = 0; index < values?.payMethod.length; index++) {
                values[values?.payMethod[index]] = true;
            }
        }
        await (
            await axiosConfig().post(points.postCompanies, { ...values })
        ).data;
        router.push(router_path.master_companies);
    }, []);

    useEffect(() => {
        if (router.query.id) {
            const getCompany = async () => {
                const { data } = await axiosConfig().get(
                    points.getCompany + "?id=" + router.query?.id
                );
                form.setFieldsValue({ ...data.data, date: moment(data.data.date) });
            };
            getCompany();
        } else {
            form.setFieldsValue({ date: moment(new Date()) });
        }
    }, []);
    return (
        <Form {...formItemLayout} form={form} onFinish={onFinish}>
            <TabsStyle
                tabPosition={"right"}
                items={
                    [
                        {
                            label: "المعلومات العامة",
                            key: "1",
                            children: <GeneralSection />
                        },
                        {
                            label: "خيارات الدفع",
                            key: "2",
                            children: <PayOptionsSection />
                        }
                    ]
                }
            />

            <FlexDiv as="div" justifyContent="end">
                <Button type="primary" htmlType="submit">أرسال</Button>
            </FlexDiv>
        </Form>
    );
};

export default TabsCompanies;