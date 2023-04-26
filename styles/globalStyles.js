// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-size: 0.9125em;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

// @media (prefers-color-scheme: dark) {
//   html {
//     color-scheme: dark;
//   }
//   body {
//     color: white;
//     background: black;
//   }
// };

.btn{
  border-radius: 7px;
  padding: 0.6rem 0.9rem;
  font-size: 1rem;
  font-weight: 400;
}
.ant-btn-success{
  color: #fff!important;
  background: #0ab39c!important;
  border-color: #0ab39c!important;
}


      // Alerts
      .callout .card{
        background-color: #fff;
        padding: 10px 20px;
        margin:10px 0px;
        border-radius: 3px;
        box-shadow: rgb(149 157 165 / 14%) 5px 1px 6px;
      }
      .callout .card .subject h3{
        text-align:right;
        margin:0;
      }
      .callout .card .subject p{
        text-align:right;
        color: #909092;
        margin:5px 0;
      }
      .callout .card .icon{
        font-size: 28px;
        color: #49d761;
      }
      .callout .card .icon-times {
        font-size: 28px;
        color: #c3c2c7;
        cursor: pointer;
      }
      .callout-success{
        border-right: 5px solid #49d761;
      }
      .callout-error{
        border-right: 5px solid #ff3232;
      }
      .callout-info{
        border-right: 5px solid #3286e9;
      }
      .callout-warning{
        border-right: 5px solid #fdc220;
      }
`;

export default GlobalStyle;
