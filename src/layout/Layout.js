import React, { Fragment } from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar/Navbar";

const MainWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh-6rem);
  margin-top: 6rem;
`;

const Layout = ({ children }) => (
  <Fragment>
    <Navbar />
    <MainWrapper>{children}</MainWrapper>
  </Fragment>
);

export default Layout;
