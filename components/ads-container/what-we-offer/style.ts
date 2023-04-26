import styled from "styled-components";

export const OfferStyle = styled.div`
    margin-bottom:150px;
   .rows{
    div:nth-of-type(1){
        .icon{
            background: #F86F03;
        }
    }
    div:nth-of-type(2){
        .icon{
            background: #525FE1;
        }
    }
    div:nth-of-type(3){
        .icon{
            background: #FFA41B;
        }
    }
    .icon{
        text-align: center;
        width: 73px;
        border-radius: 50%;
        padding: 15px;
        font-size: 29px;
        margin: auto;
        color: white;
    }
    .title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin: 10px;
    }
    .description{
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        margin: 10px;
    }
   }
`;