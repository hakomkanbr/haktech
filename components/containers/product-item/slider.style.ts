import styled from "styled-components";

export const ProductItemStyle = styled.div`
    border : 1px solid #e3e3e3;
    overflow:hidden;
    border-radius :10px;
    .ant-skeleton{
      width:100%!important;
      height: 100%;
    }
    &:hover{
      .head-actions{
        visibility: visible;
      }
      .header .actions{
        visibility: visible;
      }
    }
   
    .head-actions{
        visibility: hidden;
        -webkit-transition: 0.8s ease-in-out;
        transition: 0.8s ease-in-out;
        z-index: 99;
        /* background-color: white; */
        position: absolute;
        top: 10px;
        padding: 0 4px;
        right: 10px;
        font-size: 18px;
        border-radius: 7px;
        box-shadow: 5px 11px 43px -18px rgba(0,0,0,0.42);
        -webkit-box-shadow: 5px 11px 43px -18px rgba(0,0,0,0.42);
        -moz-box-shadow: 5px 11px 43px -18px rgba(0,0,0,0.42);
        .favorite{
          &.red{
            color:red;
          }
          &.white{
            color:black;
          }
        }
      }
    .header{
      position: relative;
       .actions{
      position: absolute;
      background: #ebebeb57;
      top: 0;
      left: 0;
      display: flex;
      visibility: hidden;
      right: 0;
      width: 100%;
      height: 100%;
      bottom: 0;
      align-items: center;
      justify-content: center;
      .ant-btn {
        color: #fff;
        background-color: #fa756d;
        font-weight: 700;
      }
    }
    }
    width:100%;
    cursor: pointer;
    .content{
        padding:10px;
        .btn-add-to-cart{
            border-radius :25px;
            width: 80%;
            background-color: ${props => props.theme.colors.orange};
            color :${props => props.theme.colors.white};
            height:37px;
            margin-top:15px;
            font-size : 1.3rem;
        }
    }
`;

