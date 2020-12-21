import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import styled from "styled-components";

import * as actions from "../../store/actions/index";
import {
  FormWrapper,
  OuterWrapper,
  StyledForm,
} from "../../components/styles/Wrappers";
import Heading from "../../components/UI/Headings/Headings";
import Button from "../../components/UI/Forms/Button";
import Input from "../../components/UI/Forms/Input";
import Message from "../../components/UI/Messages/Message";
import Home from "../Home";

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -2rem;
`;

const Page = styled.div`
  position: relative;
`;

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
});

const RecoverPassword = ({ error, loading, sendEmail, cleanUp }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={RecoverSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await sendEmail(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Page>
          <Home />
          <OuterWrapper>
            <FormWrapper>
              <Heading noMargin size="h1">
                Recover your password
              </Heading>
              <Heading size="h4" bold>
                Type in your e-mail to recover your password
              </Heading>
              <StyledForm>
                <Field
                  type="email"
                  name="email"
                  placeholder="Type your email..."
                  component={Input}
                />
                <Button
                  disabled={!isValid || isSubmitting}
                  loading={loading ? "Sending recover email..." : null}
                  type="submit"
                >
                  Recover email
                </Button>
                <MessageWrapper>
                  <Message error show={error}>
                    {error}
                  </Message>
                </MessageWrapper>
                <MessageWrapper>
                  <Message success show={error === false}>
                    Recover email sent successfully!
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
  loading: auth.recoverPassword.loading,
  error: auth.recoverPassword.error,
});

const mapDispatchToProps = {
  sendEmail: actions.recoverPassword,
  cleanUp: actions.clean,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
