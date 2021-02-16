import React, {Fragment, useState} from "react";
import styled from "styled-components";
import ProjectsSidebar from "../../components/Projects/ProjectsSidebar";
import Hamburger from "../../components/UI/Hamburger/Hamburger";
import SingleProject from "./SingleProject";

const MainWrapper = styled.div`
 background-color: ${(props) => props.opened ? "none" : "rgba(0,97,186,.6)"};
 width:  ${(props) => (props.opened ? "100px" : "50px")};
 transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
 display: none;
  @media ${(props) => props.theme.mediaQueries.small} {
    display: flex;
  }
`

const FixedWrapper = styled.div`
  position: absolute;
  z-index: 15;
  top: 7rem;
  left: 1rem;
`;

const Menu = styled.div`
  opacity: ${(props) => (props.opened ? "1" : "0")};
  transform: translateX(${(props) => (props.opened ? "0%" : "-100%")});
  transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  z-index: ${(props) => (props.opened ? "10" : "0")};
  background-color: rgb(99,156,208);

`

const ProjectsDrawer = () => {
  const [isOpened, setIsOpened] = useState(false);
  return <MainWrapper opened={isOpened}>
  <FixedWrapper>
    <Hamburger opened={isOpened} clicked={() => setIsOpened(!isOpened)} projects/>
    </FixedWrapper>
    <Menu opened={isOpened}>
      <ProjectsSidebar mobile clicked={() => setIsOpened(false)}/>
    </Menu>
  </MainWrapper>;
};

export default ProjectsDrawer;
