import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, message, Row, Space } from "antd";
import CustumerSidebar from "components/containers/custumer-pages/custumer-leftbar";
import CollectionCreateForm from "components/elements/modal/modal-create-edit";
import Container from "components/utils/container";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { orderItems } from "pages/[slug]/[company-slug]/cart";
import pointsSite from "points.site";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosConfig from "services/api";
import styled from "styled-components";
import InAddressSelectType from "types/addres-select-type";
import AdresCreateEdit from "../adres-create-edit";

interface DataType {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
};

const CardStyle = styled(Space)`
    margin:10px 0;
    display:flex;
    .ant-space-item{
        width:100%;
    }
    .ant-form-item.css-dev-only-do-not-override-1s3dcof{
        width:100%;
        margin-bottom: 0!important;
    }
    .ant-card-body{
        display: flex;
        justify-content: space-between;
        &>div{
            display: flex;
            align-items: center;
        }
        
        &>div:nth-of-type(1){
            width: 100%;
            .ant-card-meta-title{
                margin:0;
            }
        }
        &>div:nth-of-type(2){
            width: 100%;
            justify-content: center;
        }
        &>div:nth-of-type(3){
            justify-content: end;
            width: 25%;
            font-weight: bold;
            .ant-card-meta-title{
                margin:0;
            }
        }
    }
`;

const CustumerAdressView: React.FC<any> = ({ data }) => {
    const [createAddressModalOpen, setCreateAddressModalOpen] = useState<boolean>(false);
    const [adres, setAdres] = useState<any[]>(data?.data);
    const [editAdresdata, setEditAdresData] = useState({});
    const onFinishCreateAddres = useCallback(async (values: InAddressSelectType) => {
        try {
            const d = await (await axiosConfig().post(pointsSite.custumerSite_addUpdateUserLocation, { ...values, ...editAdresdata })).data;
            setAdres([d.data, ...adres]);
            return Promise.resolve(true);
        } catch (err) {
            return Promise.reject(false);
        } finally {
            setCreateAddressModalOpen(false);
        }
    }, [adres]);
    const deleteAdres = useCallback(async (id: any) => {
        await axiosConfig().delete(pointsSite.custumerSite_deleteUserLocation + "?id=" + id);
        message.success("تم مسح العنوان بنجاح");
        const newAdres = adres.filter(i => i.id != id);
        setAdres([...newAdres]);
    }, [adres]);
    return (
        <Container>
            <Row>
                <Col md={{ span: 6 }}>
                    <CustumerSidebar />
                </Col>
                <Col md={{ span: 18 }} style={{ padding: 15 }}>
                    <FlexDiv margin={[0, 0, 15, 0]} dir={true} justifyContent="space-between">
                        <Button onClick={() => {
                            setCreateAddressModalOpen(true);
                        }} type="dashed">أضف عنوان جديد</Button>
                    </FlexDiv>                    <Divider orientation="right">العناوين</Divider>
                    {
                        adres?.map((item: any, index: number) => (
                            <CardStyle key={index}>
                                <Card loading={false}>
                                    <Text as="div">{item?.addressName}</Text>
                                    <Text as="div">{item?.address}/{item?.country}/{item?.city}</Text>
                                    <Text as="div" title="مسح العنوان" style={{
                                        cursor: "pointer"
                                    }}>
                                        <a onClick={() => {
                                            deleteAdres(item.id)
                                        }} style={{ margin: "0 5px", fontSize: 15 }} href="javascript:void(0)" title="مسح العنوان"><DeleteOutlined /></a>
                                        <a onClick={() => {
                                            setEditAdresData({
                                                ...item
                                            });
                                            setCreateAddressModalOpen(true);
                                        }} style={{ margin: "0 5px", fontSize: 15 }} href="javascript:void(0)" title="تعديل العنوان"><EditOutlined /></a>
                                    </Text>
                                </Card>
                            </CardStyle>
                        ))
                    }
                </Col>
            </Row>
            <CollectionCreateForm
                title="موقع جديد"
                open={createAddressModalOpen}
                loading={false}
                onCreate={onFinishCreateAddres}
                onCancel={() => {
                    setCreateAddressModalOpen(false);
                }}>
                <AdresCreateEdit data={editAdresdata} />
            </CollectionCreateForm>
        </Container>
    )
};

export default CustumerAdressView;
