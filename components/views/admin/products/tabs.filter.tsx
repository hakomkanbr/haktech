import { Col, Row, Select } from "antd";
import FlexDiv from "components/utils/flex-div";
import React from "react";
import styled from "styled-components";
import BadgeComponent from "../../../elements/Badge/badge";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const TabsStyle = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    li {
      cursor: pointer;
      padding: 1rem 1rem;
      color: #405189;
      font-weight: 400;
      &.active {
        border-bottom: 1px solid #405189;
      }
    }
  }
`;
const TableTabs: React.FC = () => {
  const dispatch = useDispatch();
  const changeTabs = useCallback(() => {}, []);
  return (
    <TabsStyle>
      <ul>
        <li className="active">
          All <BadgeComponent />
        </li>
        <li>Published</li>
        <li>Draft</li>
      </ul>
    </TabsStyle>
  );
};

const FilterTabs = () => {
  return (
    <FlexDiv
      as="div"
      padding={[0, 0, 0, 20]}
      alignItems="center"
      justifyContent="space-between"
    >
      <div>
        <TableTabs />
      </div>
      {/* <div style={{ width: "200px" }}>
        <Select style={{ width: "100%" }}>
          <Select.Option>dasf</Select.Option>
        </Select>
      </div> */}
    </FlexDiv>
  );
};

export default FilterTabs;
