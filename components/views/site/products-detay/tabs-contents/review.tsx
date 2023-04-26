import { Button, Col, Rate, Row, Statistic, Typography } from 'antd';
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { useState } from "react";
import ContentType from "types/products";
const { Paragraph } = Typography;


const ReviewTab = ({ data }: { data: ContentType }) => {
    const [showHelp, setShowHelp] = useState<boolean>(false);
    return (
        <FlexDiv padding={[10]} cstyle={`
                        background-color: #ffffff;
                        border-radius: 3px;
                        white-space: nowrap;
                        font-size: 14px;
                        color: #666666;
                        line-height: 14px;
                    `} justifyContent="center">
            <FlexDiv
                noFlex={true}
                cstyle={`
                        overflow: hidden;
                        white-space: pre-line;
                        text-align: center;
                    `}
            >
                {data.rates && data.rates.length > 0 ? (
                    <>
                        <FlexDiv justifyContent="center">
                            <div>
                                <Text as="div" align="center" bold="bold" size={35}>
                                    <Statistic value={data.rate} />
                                </Text>
                                <Rate disabled count={5} style={{ fontSize: 14, margin: "0 10px" }} value={data.rateCount} />
                            </div>
                            <div>
                                {data.rates.map((item: any, index: number) => (
                                    <div key={index}><span className="ant-rate-text">{item.count}</span><Rate disabled count={5} style={{ fontSize: 14, margin: "0 10px" }} value={item.rate} /></div>
                                ))}
                            </div>
                        </FlexDiv>
                        {/* <Button onClick={() => {
                            setShowHelp(!showHelp);
                        }} style={{ fontSize: 12, textAlign: "center", display: "block", margin: "20px auto 10px" }} type='default'>كيف يتم احتساب النتيجة؟</Button>
                        {
                            showHelp ? (
                                <Paragraph style={{ padding: "0 15px" }} ellipsis={false}>
                                    نظرًا لأننا أزلنا منتجات البائعين الذين أنهينا تعاوننا معهم بسبب الخدمة وجودة المنتج ، فإننا لا ندرج تقييمات المشتريات التي تم إجراؤها من هؤلاء البائعين في نقاط المنتج من أجل تزويدك بتجربة أكثر دقة. .
                                </Paragraph>
                            ) : ""
                        } */}

                    </>
                ) : <Text as="p">لا توجد تعليقات حتى الآن</Text>}
            </FlexDiv>
        </FlexDiv>
    );
};

export default ReviewTab;
