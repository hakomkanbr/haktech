import React, { useState } from 'react';
import { Steps, theme } from 'antd';
import Container from 'components/utils/container';
import CartFirstStpe, { Props } from './first-step';
import CartSecondStpe from './second-step';

const CartView = ({ data }: { data: Props }) => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [orderData, setOrderData] = useState<any>({});

    const next = (prevStepData?: any) => {
        setOrderData(prevStepData);
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'المنتجات',
            content: <CartFirstStpe data={data} next={next} prev={prev} />,
        },
        {
            title: 'أكمال الطلب',
            content: <CartSecondStpe data={orderData} next={next} prev={prev} />,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        // lineHeight: '260px',
        // textAlign: 'center',
        // color: token.colorTextTertiary,
        // backgroundColor: token.colorFillAlter,
        // borderRadius: token.borderRadiusLG,
        // border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <Container style={{
            paddingTop: 15
        }}>
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {/* {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        التالي
                    </Button>
                )} */}
                {/* {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        السابق
                    </Button>
                )} */}
            </div>
        </Container>
    );
};


export default CartView;