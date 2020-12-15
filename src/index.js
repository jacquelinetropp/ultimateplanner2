import ReactDom from "react-dom";
import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import GlobalStyles from "./utils/global";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Fragment>
          <App />
          <GlobalStyles />
        </Fragment>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
