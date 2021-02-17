import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import * as actions from "../../store/actions/";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';

import Home from "../Home";

import {
  FormWrapper,
  StyledForm,
  OuterWrapper,
} from "../../components/styles/Wrappers";
import Input from "../../components/UI/Forms/Input";
import Button from "../../components/UI/Forms/Button";
import Heading from "../../components/UI/Headings/Headings";
import Message from "../../components/UI/Messages/Message";

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const Page = styled.div`
  position: relative;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("The email is required"),
  password: Yup.string()
    .required("The password is required")
    .min(8, "Too short"),
});

const Login = ({ loading, error, login, cleanUp, history }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values) => {
        await login(values);
        history.push('/');     
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Page>
          <Home />
          <OuterWrapper>
            <FormWrapper>
              <Heading noMargin size="h1">
                Login
              </Heading>
              <Heading bold size="h4">
                Fill in your details to login into your account
              </Heading>
              <StyledForm>
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  component={Input}
                />

                <Field
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  component={Input}
                />

                <Button
                  loading={loading ? "Logging In..." : null}
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
                <MessageWrapper>
                  <Message error show={error}>
                    {error}
                  </Message>
                </MessageWrapper>
              </StyledForm>
            </FormWrapper>
          </OuterWrapper>
        </Page>
      )}
    </Formik>
  );
};
const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
});

const mapDispatchToProps = {
  login: actions.signIn,
  cleanUp: actions.clean,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
