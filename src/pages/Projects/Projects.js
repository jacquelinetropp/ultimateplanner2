import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Forms/Button";
import * as actions from "../../store/actions/index";
import styled from "styled-components";

import Heading from "../../components/UI/Headings/Headings";
import InputProject from "./InputProject";
import Project from "./Project";
import Loader from "../../components/UI/Loader/Loader";

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: rgba(0,97,186,.6);
  z-index: 1;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const Content = styled.div`
  /* display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;

  @media ${(props) => props.theme.mediaQueries.medium} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${(props) => props.theme.mediaQueries.small} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Projects = ({ getProjects, projects, loading, deleting, cleanUp }) => {
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
  }
  // } else if (!projects[userId] || !projects[userId].projects) {
  //   content = (
  //     <Content>
  //       <Heading color="white" size="h2">
  //         You have no projects!
  //       </Heading>
  //     </Content>
  //   );
  // } else if (projects[userId].projects.length === 0) {
  //   content = (
  //     <Content>
  //       <Heading color="white" size="h2">
  //         You have no projects!
  //       </Heading>
  //     </Content>
  //   ); }
  else {
    content = (
      <Content>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </Content>
    );
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading nomargin size="h1" color="white">
          Your Projects
        </Heading>
        <Heading size="h4" bold color="white">
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
const mapStateToProps = ({ firebase, firestore, projects }) => ({
  userId: firebase.auth.uid,
  projects: projects.projects,
  loading: projects.loading,
  deleting: projects.deleteProject.loading,
});

const mapDispatchToProps = {
  getProjects: actions.getProjects,
  cleanUp: actions.cleanUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
