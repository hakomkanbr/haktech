import FlexDiv from "components/utils/flex-div";
import styled from "styled-components";

export const CartBuyOptionsStyle = styled(FlexDiv)`
    .ant-radio-button-wrapper{
       height: auto;
        width: 156px;
        margin: 0 8px;
        padding: 9px;
        border-radius: 15px;
        border: 1px solid #dadada;
        &::before{
            display: none;
        }
    }

    .ant-radio-button-wrapper-checked{
        .icon{
            color: #f87a6c;
        }
        .text{
            color: #f87a6a;
            font-weight: 900;
        }
    }
`;

