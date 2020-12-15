import React from "react";
import styled from "styled-components";
import { withTheme } from "styled-components";
import Logo from "../../Logo/Logo";
import { Container } from "../../hoc/layouts/elements";
import NavItems from "../NavItems/NavItems";

const FixedWrapper = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.colors.main};
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;

  @media ${(props) => props.theme.mediaQueries.small} {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const Navbar = () => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
          <Logo />
          <NavItems />
        </Wrapper>
      </Container>
    </FixedWrapper>
  );
};

export default withTheme(Navbar);
