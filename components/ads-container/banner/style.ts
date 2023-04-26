import styled from "styled-components";

export const BannerStyle = styled.div`
    background-image:url(/assets/images/banner.webp);
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: cover;
    height:100vh;
    padding-top:100px;
    position: relative;
    z-index: 1;
    &:after {
          background: grey;
        content: "";
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
        z-index:-1;
        background-position: top center;
        background-repeat: no-repeat;
        background-size: auto;
        transition: background .3s,border-radius .3s,opacity .3s;
    }
    .btn1{
        background: linear-gradient(to right,#ff3834 0%,#ff7133 100%);
        color: #fefeff;
        font-weight: 500;
    }
    .btn2{
        color: #525252;
    }
    .btn1,.btn2{
        margin:15px 5px 0;
        border-radius: 4px;
        position: relative;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        -webkit-transition: all .3s ease-in-out!important;
        transition: all .3s ease-in-out!important;
        -webkit-transition: all .3s ease-in-out!important;
        font-family: poppins,Sans-serif;
        font-size: 16px;
        height: 49px;
        line-height: 0px;
    }
    .btn2{

    }
`;