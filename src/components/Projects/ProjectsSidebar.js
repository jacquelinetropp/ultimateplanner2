/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../UI/Forms/Button";
import * as actions from "../../store/actions/index";
import styled from "styled-components";

import { useParams } from "react-router-dom";

import Heading from "../UI/Headings/Headings";
import InputProject from "../../pages/Projects/InputProject";
import SingleProject from "../../pages/Projects/SingleProject";
import Loader from "../UI/Loader/Loader";

const Wrapper = styled.div`
 
  min-height: calc(100vh - 6rem);
  background-color: ${(props) => props.mobile ? "none" : "rgba(0,97,186,.6);"};

  z-index: 1;
  display: flex;
  @media ${(props) => props.theme.mediaQueries.small} {
    display: ${(props) => props.mobile ? "flex" : "none"}
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2rem;
`;

const ProjectsSidebar = ({ getProjects, projects, loading, deleting, mobile }) => {
  useEffect(() => {
    getProjects();
  }, []);

  const {id} = useParams();

  const [isAdding, setIsAdding] = useState(false);

  let content;

  if (!projects || loading || deleting) {
    content = (
      <Content>
        <Loader isWhite />
      </Content>
    );
  }
  else {
    content = (
      <Content>
        {projects.map((project) => {
            if (project.id === id) {
                return <SingleProject key={project.id} project={project} active/>
            }  else {
                return <SingleProject key={project.id} project={project} />
            }
        })}
      </Content>
    );
  }

  return (
    <Wrapper mobile={mobile}>
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
  cleanUp: actions.projectCleanUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSidebar);
