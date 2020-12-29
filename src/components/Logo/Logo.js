import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoWrapper = styled(Link)`
  color: var(--color-white);
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 1rem;
`;

const Logo = () => {
  return <LogoWrapper to="/">Productivity</LogoWrapper>;
};

export default Logo;
