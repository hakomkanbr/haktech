import { Badge, Menu, Space } from "antd";
import styled from "styled-components";

export const SearchSpaceStyle = styled(Space.Compact)`
    position: relative;
    top: -2px;
    width:100%;
    .ant-select-selection-item{
        line-height: 37px!important;
    }
    .ant-select-selector{
        border-radius: 0px 50px 50px 0px;
        height:100%!important;
    }
    .ant-input{
        padding:8px;
    }
    .ant-btn{
        background-color: #444;
        height: 40px!important;
        color: white;
        border-radius: 50px 0px 0px 50px;
        font-weight: bold;
    }
`;

export const BadgeStyle = styled(Badge)`
    background-color: #ff5f05;
    color: white;
    border-radius: 50%;
    padding: 6px 9px;
    font-size: 30px;
    background: #ff5c00;
    .ant-badge-count{
        display:flex;
        background-color: #444;
        justify-content:center;
        flex-direction: row-reverse
    }
`;

export const MenuStyle = styled(Menu)`
  border-bottom: none;
  background: none!important;
  /* background-color: #ece5dd; */
  /* justify-content: center; */
  .ant-menu-item:nth-of-type(1){
      padding:0 0 0 10px!important;
  }
  .ant-menu-item{
    span {
      font-size: 1.3rem;
    }
    a{
        color:#656464;
        font-weight: 400;
        &:hover{
            color:#ff5c00;
        }
    }
    &:after {
      border-bottom: 0 solid !important;
    }
    &:hover{
        &:after {
          border-bottom: 0 solid !important;
        }
    }
    &.ant-menu-item-selected {
      color: ${(props) => props.theme.colors.orange}!important;
      &:after {
        border-bottom: 0 solid !important;
      }
    }
  }
`;