import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import React from 'react';
import styled from 'styled-components';

const BadgeStyle = styled.span`
    .ant-badge-count{
        background-color : rgba(240, 101 ,72 , 10%);
        color: #f06548;
    }
`
const BadgeComponent = (props: any) => {
    return (
        <BadgeStyle>
            <Badge {...props} />
        </BadgeStyle>
    );
};


export default BadgeComponent;