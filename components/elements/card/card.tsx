import { Card } from "antd";
import React from "react";
import CardStyle from "./card.style";

function CardComponent(props: any) {
    var { children } = props;
    return (
        <CardStyle>
            <Card {...props}>
                {children}
            </Card>
        </CardStyle>
    );
};

export default CardComponent;