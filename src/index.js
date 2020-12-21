import ReactDom from "react-dom";
import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import GlobalStyles from "./utils/global";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import Loader from "./components/UI/Loader/Loader";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const root = document.getElementById("root");

ReactDom.render(
  <ThemeProvider theme={theme}>
    <Fragment>
      <Wrapper>
        <Loader />
      </Wrapper>
      <GlobalStyles />
    </Fragment>
  </ThemeProvider>,
  root
);

store.firebaseAuthIsReady.then(() => {
  ReactDom.render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyles />
            <App />
          </Fragment>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
    root
  );
});
