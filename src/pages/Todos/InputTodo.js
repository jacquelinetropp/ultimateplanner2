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
import { useParams } from "react-router-dom";

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

const TodoSchema = Yup.object().shape({
  todo: Yup.string().required("The todo is required.").min(2, "Too short."),
});

const InputTodo = ({
  todo,
  addTodo,
  loading,
  error,
  opened,
  close,
  editTodo,
}) => {
  const { id } = useParams();
  const loadingText = todo ? "Editing..." : "Adding...";
  return (
    <Fragment>
      <Modal opened={opened} close={close}>
        <Heading noMargin size="h1" color="white">
          {todo ? "Edit your task" : "Add your new task"}
        </Heading>
        <Heading bold size="h4" color="white">
          {todo ? "Change your task here" : "Type your task here"}
        </Heading>
        <Formik
          initialValues={{
            todo: todo ? todo.todo : "",
          }}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // send our todo
            const res = todo
              ? await editTodo(todo.id, values)
              : (await addTodo(values, id), close(), resetForm());
              // close();
              // resetForm();
          }}
        >
          {({ isSubmitting, isValid, resetForm }) => (
            <StyledForm>
              <Field
                type="text"
                name="todo"
                placeholder="Write your task..."
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
                  {todo ? "Edit Task" : "Add Task"}
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

const mapStateToProps = ({ todos }) => ({
  loading: todos.loading,
  error: todos.error,
  
});

const mapDispatchToProps = {
  addTodo: actions.addTodo,
  editTodo: actions.editTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
