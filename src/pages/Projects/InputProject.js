import React, { Fragment } from "react";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "../../components/UI/Forms/Button";
import Heading from "../../components/UI/Headings/Headings";
import Message from "../../components/UI/Messages/Message";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Forms/Input";
import { StyledForm } from "../../components/styles/Wrappers";

import * as actions from "../../store/actions";

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

const ProjectSchema = Yup.object().shape({
  project: Yup.string()
    .required("The project is required.")
    .min(2, "Too short."),
});

const InputProject = ({
  project,
  addProject,
  loading,
  error,
  opened,
  close,
  editProject, cleanUp, getProjects
}) => {
  const loadingText = project ? "Editing..." : "Adding...";

  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <Heading noMargin size="h1" color="white">
          {project ? "Edit your project" : "Add your new Project"}
        </Heading>
        <Heading bold size="h4" color="white">
          {project ? "Change your project here" : "Type your project here"}
        </Heading>
        <Formik
          initialValues={{
            project: project ? project.name : "",
          }}
          validationSchema={ProjectSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {  
        
            // send our project           
            const res = project
              ? await editProject(project.id, values)
              : (await addProject(values), close(), resetForm() );              
  
          }}
        >
          {({ values, handleChange, isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <Field
                type="text"
                name="project"
                placeholder={project ? project.name : "Write your project..."}
                onChange={handleChange}
                value={values.project}
                component={Input}
              />
              <ButtonsWrapper>
                <Button
                  contain
                  color="main"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  loading={loading ? loadingText : null}
                >
                  {project ? "Edit Project" : "Add Project"}
                </Button>
                <Button
                  type="button"
                  color="red"
                  contain
                  onClick={() => {
                    close();
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </ButtonsWrapper>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ projects }) => ({
  loading: projects.loading,
  error: projects.error,
});

const mapDispatchToProps = {
  addProject: actions.addProject,
  editProject: actions.editProject,
  cleanUp: actions.projectCleanUp,
  getProjects: actions.getProjects
};

export default connect(mapStateToProps, mapDispatchToProps)(InputProject);
