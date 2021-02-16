import React, { Fragment } from "react";
import styled from "styled-components";
import NavItem from "./NavItem";

const Nav = styled.nav`
  display: flex;
  margin-top: ${(props) => (props.mobile ? "-6rem" : null)};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${(props) => (props.mobile ? "column" : "row")};
  align-items: center;
  height: 100%;
`;

const NavItems = ({ mobile, clicked, loggedIn }) => {
  let links;
  if (loggedIn.uid) {
    links = (
      <Fragment>
        <NavItem clicked={clicked} mobile={mobile} link="/">
          Projects
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/profile">
          Profile
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/logout">
          Log Out
        </NavItem>
      </Fragment>
    );
  } else {
    links = (
      <Fragment>
        <NavItem clicked={clicked} mobile={mobile} link="/login">
          Login
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/signup">
          Signup
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link="/recover">
          Recover password
        </NavItem>
      </Fragment>
    );
  }
  return (
    <Nav>
      <Ul mobile={mobile}>{links}</Ul>
    </Nav>
  );
};

export default NavItems;
