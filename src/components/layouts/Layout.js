import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Navbar from "../Navigation/Navbar/Navbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const MainWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-tertiary);
`;

const Layout = ({ children, loggedIn }) => (
  <Fragment>
    <Navbar loggedIn={loggedIn} />
    <SideDrawer loggedIn={loggedIn} />
    <MainWrapper>{children}</MainWrapper>
  </Fragment>
);
const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth,
});

export default connect(mapStateToProps)(Layout);
