import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Hamburger from "../../UI/Hamburger/Hamburger";

const FixedWrapper = styled.div`
  position: fixed;
  background-color: ${(props) => props.transparent ? "transparent" : "var(--color-main)"};
  z-index: 10;
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: none;
  @media ${(props) => props.theme.mediaQueries.small} {
    display: flex;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const Menu = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.main};
  height: 100vh;
  align-items: center;
  justify-content: center;
  position: fixed;
  margin-top: 6rem;
  opacity: ${(props) => (props.opened ? "1" : "0")};
  transform: translateY(${(props) => (props.opened ? "0%" : "-100%")});
  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  top: 0;
  left: 0;
  display: none;
  z-index: ${(props) => (props.opened ? "10" : "0")};
  @media ${(props) => props.theme.mediaQueries.small} {
    display: flex;
  }
`;

const SideDrawer = ({ loggedIn, transparent }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <Fragment>
      <FixedWrapper transparent={transparent}>
        <Wrapper>
          <Logo />
          <Hamburger opened={isOpened} clicked={() => setIsOpened(!isOpened)} />
        </Wrapper>
      </FixedWrapper>
      <Menu opened={isOpened}>
        <NavItems
          loggedIn={loggedIn}
          mobile
          clicked={() => setIsOpened(false)}
        />
      </Menu>
    </Fragment>
  );
};

export default SideDrawer;
