// /* containers */

import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  max-width: 1800px;
  @media (max-width: 2100px) {
    max-width: 1600px;
  }
  @media (max-width: 2100px) {
    max-width: 1300px;
  }

  @media (max-width: 1700px) {
    max-width: 1200px;
  }

  @media (max-width: 1450px) {
    max-width: 1350px;
  }
  @media (max-width: 1200px) {
    max-width: 1150px;
    padding: 0px 20px;
  }
  @media (max-width: 691px) {
    max-width: 700px;
  }
`;

export default Container;
