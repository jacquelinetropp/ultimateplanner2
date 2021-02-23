import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Forms/Button";
import * as actions from "../../store/actions/index";
import styled from "styled-components";

import Heading from "../../components/UI/Headings/Headings";
import InputProject from "./InputProject";
import Loader from "../../components/UI/Loader/Loader";
import SingleProject from "./SingleProject";

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: rgba(255,230,198, .4);
  z-index: 1;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-gap: 2rem;

  @media ${(props) => props.theme.mediaQueries.medium} {
    grid-template-columns: repeat(2,  minmax(250px, 1fr));
  }
  @media ${(props) => props.theme.mediaQueries.small} {
    grid-template-columns: repeat(1,  minmax(250px, 1fr));
  }
`;

const Projects = ({ getProjects, projects, loading, deleting }) => {
  useEffect(() => {
    getProjects();
  }, []);

  const [isAdding, setIsAdding] = useState(false);

  let content;

  if (!projects || loading || deleting) {
    content = (
      <Content>
        <Loader isWhite />
      </Content>
    );
  } else if (projects.length === 0) {
    content = (
      <Content>
      <Heading size="h4" bold noProjects>
        No Projects. Please Add a project.
      </Heading> 
    </Content> )
  }
  else {
    content = (
      <Content>
        {projects.map((project) => (
          <SingleProject key={project.id} project={project} home/>
        ))}
      </Content>
    );
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading nomargin size="h1">
          Your Projects
        </Heading>
        <Heading size="h4" bold>
          All you have to do for now...
        </Heading>
        <Button color="main" contain onClick={() => setIsAdding(true)}>
          Add Project
        </Button>
        <InputProject opened={isAdding} close={() => setIsAdding(false)} />
        {content}
      </InnerWrapper>
    </Wrapper>
  );
};
const mapStateToProps = ({ firebase, projects }) => ({
  userId: firebase.auth.uid,
  projects: projects.projects,
  loading: projects.loading,
  deleting: projects.deleteProject.loading,
});

const mapDispatchToProps = {
  getProjects: actions.getProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
