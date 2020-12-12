import ReactDom from "react-dom";
import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import GlobalStyles from "./utils/global";

import App from "./App";

ReactDom.render(
  <ThemeProvider theme={theme}>
    <Fragment>
      <App />
      <GlobalStyles />
    </Fragment>
  </ThemeProvider>,
  document.getElementById("root")
);
