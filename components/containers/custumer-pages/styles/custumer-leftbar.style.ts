import { List } from "antd";
import styled from "styled-components";

const ListStyle = styled(List)`
    margin:20px;
    .ant-list-header{
        padding:8px 24px!important;
    }
    .ant-list-item{
        padding:10px!important;
        a{
            font-weight: bold;
            color:#847676;
        }
    }
    .ant-list-item-meta-title{
        margin:10px 0;
    }
`;


export default ListStyle;