import styled from "styled-components";
import FlexDiv from "components/utils/flex-div";
import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Text from "components/utils/text";
import { AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import Container from "../../utils/container";
import theam from "../../../config/theam";
import { InWebSettingContextProps, WebSettingContext } from "contexts/web-setting";
import socialMediaData from "enums/social-media";

const MainItem = styled.li`
  color: ${(props) => props.theme.colors.black};
  transition: 0.5s ease;
  &:hover {
    color: ${(props) => props.theme.colors.orange};
  }
  padding: 0 10px;
  font-size: 1rem;
  a {
    display: grid;
  }
`;

const Topbar = () => {
  return (
    <div style={{ borderBottom: "1px solid #e0dada64" }}>
      <Container>
        <FlexDiv
          as="div"

          bg="#fff"
          padding={[6, 0]}
          justifyContent="space-between"
        >
          <FlexDiv as="ul" margin={0} cstyle={"list-style-type : none"}>
            {/* {
            generalData?.company?.socials?.map((n: any, i: number) => {
              return (
                <MainItem key={i}>
                  <a href={n?.url}>     {
                    socialMediaData?.map((m: any) => {
                      if (n?.name === m?.value) {
                        return (
                          m.icon
                        )
                      }
                    })
                  }</a>
                </MainItem>
              )
            })
          } */}
          </FlexDiv>
          <div>
            <Text color="#6f6969db" bold="500" margin={0}>
              تسجيل الدخول
            </Text>
            <Text color="#6f6969db" bold="500" margin={[0, 10, 0, 0]}>
              أو
            </Text>
            <Text color="#6f6969db" bold="500" margin={[0, 10, 0, 0]}>
              أنشاء حساب
            </Text>
          </div>
        </FlexDiv>
      </Container>
    </div>
  );
};

export default Topbar;
