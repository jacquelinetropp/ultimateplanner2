import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";


import * as actions from "../../store/actions/index";

import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Forms/Button";
import Heading from "../../components/UI/Headings/Headings";
import Message from "../../components/UI/Messages/Message";
import { withRouter } from "react-router-dom";

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;
const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0 rem;
  width: 100%;
  padding: 0 3rem;
`;

const TodoWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--color-white);
`;

const DeleteProject = ({
  show,
  close,
  project,
  deleteProject,
  loading,
  error,
  history
}) => {
  return (
    <Modal opened={show} close={close}>
      <Heading noMargin size="h1" color="white">
        Deleting Project
      </Heading>
      <Heading bold size="h4" color="white">
        Are you sure you want to delete this todo?
      </Heading>
      <TodoWrapper>{project.name}</TodoWrapper>
      <ButtonsWrapper>
        <Button
          contain
          color="red"
          onClick={() => {
      
            deleteProject(project.id);
            history.push("/");
          }}
          disabled={loading}
          loading={loading ? "Deleting..." : null}
        >
          Delete
        </Button>
        <Button type="button" color="main" contain onClick={close}>
          Cancel
        </Button>
      </ButtonsWrapper>
      <MessageWrapper>
        <Message error show={error}>
          {error}
        </Message>
      </MessageWrapper>
    </Modal>
  );
};

const mapStateToProps = ({ projects }) => ({
  error: projects.deleteProject.error,
  loading: projects.deleteProject.loading,
});

const mapDispatchToProps = {
  deleteProject: actions.deleteProject,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteProject));
