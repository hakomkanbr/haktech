import { CloseOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Row, Space } from "antd";
import CustumerSidebar from "components/containers/custumer-pages/custumer-leftbar";
import Container from "components/utils/container";
import Text from "components/utils/text";
import { currencyFormatter } from "helpers/money-formet";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styled from "styled-components";

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
const CustumerOrdersView: React.FC<any> = ({ products }: any) => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6 }}>
                    <CustumerSidebar />
                </Col>
                <Col md={{ span: 18 }} style={{ padding: 15 }}>
                    <Divider orientation="right">طلباتي</Divider>
                    {
                        products.data.map((item: any, index: number) => (
                            <CardStyle key={index}>
                                <Card loading={false}>
                                    <Card.Meta
                                        title={`${item?.code}#`}
                                        description={<>
                                            {item?.productCount} <CloseOutlined />
                                        </>}
                                    />
                                    <Text as="div">تم التوصيل<AiOutlineCheckCircle size={15} style={{ margin: "0 5px" }} /></Text>
                                    <Card.Meta
                                        title={currencyFormatter(item.price)}
                                        description={item?.payMethod}
                                    />
                                </Card>
                            </CardStyle>
                        ))
                    }
                </Col>
            </Row>
        </Container>
    )
};

export default CustumerOrdersView;
