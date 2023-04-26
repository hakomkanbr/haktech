import styled from "styled-components";

const AdminLayoutStyle = styled.div`
    .ant-layout{
        min-height:100vh;
        .ant-layout-header{
            background-color : #fff;
            display: flex;
            padding: 0 15px;    
            align-items: center;
            padding: 0 15px;
            justify-content: space-between;
            ul{
                list-style-type: none;
                padding: 0;
                margin: 0;
                li{
                    display : inline;
                }
            }
            // .left-minify{}
            // .right-minify{}
        }
        .ant-layout-sider{
            background-color : #405189;
        }
        .ant-menu{
            background-color : #405189;
            color:#abb9e8;
            border:none;
            .ant-menu-submenu-arrow{
                color:#abb9e8;
                &:hover , &:focus , &:active{
                    background: none;
                    color:#fff;
                }
            }
            &.ant-menu-inline-collapsed{
                .anticon{
                    font-size : 19px;
                }

            }
            .ant-menu-submenu-title{
                &:hover , &:focus , &:active{
                    background: none;
                    color:#fff;
                }
            }
            .ant-menu-item{
                width : calc(100%);
                &:hover , &:focus , &:active{
                    color:#fff;
                    background: none;
                }
                color:#abb9e8;
            }
            .ant-menu-item-selected{
                background-color : #405189;
                color:#fff;
                font-weight: 700;
                &:after{
                    border : none;
                }
            }
            .ant-menu-inline{
                border:none;
            }
        }
        .logo{
            color: white;
            font-size: 24px;
            text-align: center;
            padding: 10px 0px;
        }
    }
`;

export default AdminLayoutStyle;