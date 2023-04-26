import styled from "styled-components";
import { useState, useCallback } from "react";
// modules
import useTranslation from "next-translate/useTranslation";
import Text from "./text";

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.primary};
`;

function ExpandableText({ text, maxSize, itemProp }) {
  const { t, lang } = useTranslation("common");

  const [expanded, setExpanded] = useState(false);

  const handleExpandableTextChange = useCallback((v) => {
    setExpanded(v);
  }, []);

  return (
    <p>
      <Text itemProp={itemProp}>
        {text.length > maxSize ? (
          <>
            {expanded ? (
              <>
                {text}{" "}
                <StyledLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleExpandableTextChange(false);
                  }}
                >
                  {t("showLess")}
                </StyledLink>
              </>
            ) : (
              <>
                {text.substring(0, maxSize)}...{" "}
                <StyledLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleExpandableTextChange(true);
                  }}
                >
                  {t("showMore")}
                </StyledLink>
              </>
            )}
          </>
        ) : (
          text
        )}
      </Text>
    </p>
  );
}

export default ExpandableText;
