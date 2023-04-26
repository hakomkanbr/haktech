import styled from "styled-components";
// components
import { Divider as AntDivider } from "antd";
import PropTypes from "prop-types";

// styles
const StyledDivider = styled(AntDivider)`
  width: ${(props) =>
    props.width && Number.isInteger(props.width)
      ? props.width + "px"
      : props.width};
  padding: ${(props) => {
    if (Number.isInteger(props.padding)) {
      return props.padding + "px";
    } else if (Array.isArray(props.padding)) {
      let str = ``;
      props.padding.map((num, i) => (str += `${props.padding[i]}px `));
      return str;
    }
  }};
  margin: ${(props) => {
    if (Number.isInteger(props.margin)) {
      return props.margin + "px";
    } else if (Array.isArray(props.margin)) {
      let str = ``;
      props.margin.map((num, i) => (str += `${props.margin[i]}px `));
      return str;
    }
  }};
  ${(props) => (props.cstyle ? props.cstyle : "")}
`;

const Divider = ({ padding, margin, width, cStyle }) => {
  return (
    <StyledDivider
      padding={padding}
      margin={margin}
      width={width}
      cstyle={cStyle}
    />
  );
};

Divider.propTypes = {
  padding: PropTypes.any,
  margin: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cstyle: PropTypes.string,
};

Divider.defaultProps = {
  padding: null,
  margin: null,
  width: null,
  cstyle: null,
};

export default Divider;
