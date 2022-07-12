import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoWrapper = styled(Link)`
  color: ${(props) => (props.mobile ? "white" : "#082B59")};
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 1rem;
`;

const Logo = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 600;
  React.useEffect(() => {
   const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  let windowSize;

  if (breakpoint > width) {
    windowSize = "windowsize"
  } else {
    windowSize = null;
  }
  console.log(windowSize);
  return <LogoWrapper mobile={windowSize} to="/">Productivity</LogoWrapper>;
};

export default Logo;
