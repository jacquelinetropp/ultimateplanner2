import React from "react";
import styled from "styled-components";
import { withTheme } from "styled-components";
import Logo from "../../Logo/Logo";
import { Container } from "../../styles/Wrappers";
import NavItems from "../NavItems/NavItems";

const FixedWrapper = styled.header`
  position: fixed;
  background-color: ${({ transparent }) =>
    transparent ? "transparent" : "var(--color-main)"};
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  z-index: 2;

  @media ${(props) => props.theme.mediaQueries.small} {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const Navbar = ({ loggedIn, transparent }) => {
  return (
    <FixedWrapper transparent={transparent}>
      <Container>
        <Wrapper>
          <Logo />
          <NavItems loggedIn={loggedIn} />
        </Wrapper>
      </Container>
    </FixedWrapper>
  );
};

export default withTheme(Navbar);
