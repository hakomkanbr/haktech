import { Button, Form } from "antd";
import styled from "styled-components";

export const FormStyle = styled(Form)`
  width: 470px;
  padding: 70px 50px;
  box-shadow: 0 0 35px rgb(0 0 0 / 10%);
  background-color: #ffffff;
  margin: auto;
  position: relative;

  .ant-form-item-label {
    padding-bottom: 0;
  }

  &::before {
    content: "";
    width: 75px;
    height: 150px;
    position: absolute;
    bottom: 30px;
    left: 0;
    background: url("/assets/images/img-53.png") top left repeat;
    background-size: cover;
    z-index: 1;
  }
  &::after {
    content: "";
    width: 75px;
    height: 150px;
    position: absolute;
    top: 30px;
    right: 0;

    background: url("/assets/images/img-54.png") top right repeat;
    background-size: cover;
    z-index: 1;
  }
`;
export const FormItenStyle = styled(Form.Item)`
  .ant-input-affix-wrapper {
    padding: 14.5px 0;
    border: none;
    border-bottom: 2px solid #bebcbc;
  }

  .ant-input-affix-wrapper > input.ant-input {
    padding: 0 10px;
    font-size: 16px;
  }
`;
export const SubmitBtnStyle = styled(Button)`
  width: 100%;
  z-index: 2;
  margin-top: 20px;
  padding: 15px;
  height: 50px;
  background-color: #00c5e7;
`;