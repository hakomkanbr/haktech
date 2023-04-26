import styled from "styled-components";

export const NavbarStyle = styled.div`
    width:100%;
    position: fixed;
    z-index:3;
    transition: all 0.2s ease-in-out;
    &.bg-navbar{
        background:#fff;
        box-shadow: 2px 1px 59px -21px rgba(0,0,0,0.75);
        -webkit-box-shadow: 2px 1px 59px -21px rgba(0,0,0,0.75);
        -moz-box-shadow: 2px 1px 59px -21px rgba(0,0,0,0.75);
    }
    ul{
        list-style-type: none;
        display:flex;
        justify-content: center;
        .active{
            font-weight: bold;
        }
        li{
            padding:10px;
            font-size:16px;
        }
    }
    nav{
        padding:16px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        a{
            padding: 10px 16px;
            font-size: 17px;
        }
    }
`;