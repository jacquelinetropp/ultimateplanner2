import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Formik, Field } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import * as actions from "../../store/actions";

import { FormWrapper, StyledForm } from "../../components/hoc/layouts/elements";
import Heading from "../../components/UI/Headings/Headings";
import Message from "../../components/UI/Messages/Message";
import Button from "../../components/UI/Forms/Button";
import Input from "../../components/UI/Forms/Input";
import Modal from "../../components//UI/Modal/Modal";

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Your first name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  lastName: Yup.string()
    .required("Your last name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  password: Yup.string().min(8, "Too short"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    `Password doesn't match`
  ),
});

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  color: var(--color-errorRed);
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const Profile = ({
  loading,
  error,
  firebase,
  editProfile,
  cleanUp,
  deleteUser,
  loadingDelete,
  errorDelete,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const [modalOpened, setModalOpened] = useState(false);

  if (!firebase.profile.isLoaded) return null;
  return (
    <Fragment>
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await editProfile(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <FormWrapper>
            <Heading noMargin size="h1">
              Edit your profile
            </Heading>
            <Heading bold size="h4">
              Here you can edit your profile
            </Heading>
            <StyledForm>
              <Field
                type="text"
                name="firstName"
                placeholder="Your first name..."
                component={Input}
              />
              <Field
                type="text"
                name="lastName"
                placeholder="Your last name..."
                component={Input}
              />
              <Field
                type="email"
                name="email"
                placeholder="Your email..."
                component={Input}
              />
              <Field
                type="password"
                name="password"
                placeholder="Your password..."
                component={Input}
              />
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Re-type your password..."
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                loading={loading ? "Editing..." : null}
                type="submit"
              >
                Edit
              </Button>
              <MessageWrapper>
                <Message error show={error}>
                  {error}
                </Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Profile was updated!
                </Message>
              </MessageWrapper>
              <DeleteWrapper onClick={() => setModalOpened(true)}>
                Delete my account
              </DeleteWrapper>
            </StyledForm>
          </FormWrapper>
        )}
      </Formik>
      <Modal opened={modalOpened} close={() => setModalOpened(false)}>
        <Heading noMargin size="h1">
          Delete your account
        </Heading>
        <Heading bold size="h4">
          Do you really want to delete your account?
        </Heading>
        <ButtonsWrapper>
          <Button
            contain
            onClick={() => deleteUser()}
            color="red"
            disabled={loadingDelete}
            loading={loadingDelete ? "Deleting..." : null}
          >
            Delete
          </Button>
          <Button color="main" contain onClick={() => setModalOpened(false)}>
            Cancel
          </Button>
        </ButtonsWrapper>
        <MessageWrapper>
          <Message error show={errorDelete}>
            {errorDelete}
          </Message>
        </MessageWrapper>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ firebase, auth }) => ({
  firebase,
  loading: auth.profile.loading,
  error: auth.profile.error,
  loadingDelete: auth.deleteUser.loading,
  errorDelete: auth.deleteUser.error,
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
