import { Button, Form, Tabs } from "antd";
import points from "points";
import router_path from "paths";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import slugGenerator from "helpers/slug-generator";
import axiosConfig from "services/api";
import GeneralSection from "./general";
import PayOptionsSection from "./pay-options";
import styled from "styled-components";
import FlexDiv from "components/utils/flex-div";
import SocialMediaSettingSection from "./social-media";
import SeoSettingSection from "./seo-setting";
import pointsSite from "points.site";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";
import ContactSection from "./contact";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
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
    const [data, setData] = useState({});
    const { user, loading }: { user: any, loading: boolean } = useSelector((stata: RootState) => stata.user)
    const onFinish = useCallback(async (values: any) => {
        console.info("valeus : ", values);
        values.slug = slugGenerator(values?.name ?? values?.title);
        values.photos = [];
        values.Phone = `${values.Phone?.number}`;
        if (values?.payMethod && Array.isArray(values.payMethod)) {
            for (let index = 0; index < values?.payMethod.length; index++) {
                values[values?.payMethod[index]] = true;
            }
        }
        await (
            await axiosConfig().post(points.updateCompanyProfile, { ...data, ...values })
        ).data;
        Swal.fire({
            title: "تم التعديل بنجاح"
        }).then((res) => {
            signOut({
                redirect: false,
                callbackUrl: "/auth/login"
            })
            router.push(router_path.login);
        })
    }, [data]);

    useEffect(() => {
        if (user?.CompanySlug) {
            console.info("user : ", user);
            const getProfileAdmin = async () => {
                const { data } = await axiosConfig().post(
                    `${pointsSite.getCompanyProfile}?slug=${user?.CompanySlug}`
                );
                var payMethod = [];
                if (data.data.company?.eft) {
                    payMethod.push("eft")
                } else if (data.data.company?.onADoor) {
                    payMethod.push("onADoor")
                }
                form.setFieldsValue({
                    ...data.data.company, date: moment(data.data.date),
                    payMethod: payMethod
                });
                setData({
                    ...data.data.company
                })
            };
            getProfileAdmin();
        }
    }, [user]);
    return (
        <Form {...formItemLayout} layout="vertical" form={form} onFinish={onFinish}>
            <TabsStyle
                tabPosition={"right"}
                items={
                    [
                        {
                            label: "معلومات العامة",
                            key: "1",
                            children: <GeneralSection />
                        },
                        {
                            label: "مواقع التواصل الأجتماعي",
                            key: "3",
                            children: <SocialMediaSettingSection />
                        },
                        {
                            label: "معلومات التواصل",
                            key: "4",
                            children: <ContactSection />
                        },
                        {
                            label: "خيارات الدفع",
                            key: "5",
                            children: <PayOptionsSection />
                        },
                        {
                            label: "SEO",
                            key: "6",
                            children: <SeoSettingSection />
                        },
                    ]
                }
            />

            <FlexDiv margin={[0, 15]} as="div" justifyContent="end">
                <Button type="primary" htmlType="submit">أرسال</Button>
            </FlexDiv>
        </Form>
    );
};

export default TabsCompanies;