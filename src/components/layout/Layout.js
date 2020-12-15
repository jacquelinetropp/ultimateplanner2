import React, { Fragment } from "react";
import styled from "styled-components";

import Navbar from "../Navigation/Navbar/Navbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const MainWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = ({ children }) => (
  <Fragment>
    <Navbar />
    <SideDrawer />
    <MainWrapper>{children}</MainWrapper>
  </Fragment>
);

export default Layout;
