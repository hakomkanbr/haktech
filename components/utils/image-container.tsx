import styled from "styled-components";

// styles
const StyledImageContainer = styled.div<any>`
  overflow: hidden;
  width: ${(props) =>
    props.width && Number.isInteger(props.width)
      ? props.width + "px"
      : props.width};
  height: ${(props) =>
    props.height && Number.isInteger(props.height)
      ? props.height + "px"
      : props.height};
  border-radius: ${(props) =>
    props.radius && Number.isInteger(props.radius)
      ? props.radius + "px"
      : props.radius};
  margin: ${(props) => {
    if (Number.isInteger(props.margin)) {
      return props.margin + "px";
    } else if (Array.isArray(props.margin)) {
      let str = ``;
      props.margin.map(
        (num: any, i: number) => (str += `${props.margin[i]}px `)
      );
      return str;
    } else {
      return props.margin;
    }
  }};
  ${(props) => (props.cstyle ? props.cstyle : "")}
`;

export default function ImageContainer({
  width,
  height,
  radius,
  children,
  margin,
  cstyle,
}: any) {
  return (
    <StyledImageContainer
      width={width}
      height={height}
      radius={radius}
      margin={margin}
      cstyle={cstyle}
    >
      {children}
    </StyledImageContainer>
  );
}
