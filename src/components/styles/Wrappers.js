import styled from "styled-components";
import { Form } from "formik";

export const Container = styled.div`
  width: 100%;
  max-width: 140rem;
  margin: 0 auto;
  height: 100%;
`;

export const OuterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  flex-direction: column;
  border-radius: 1rem;
  padding: 10rem 8rem;
  display: flex;
  align-items: center;
  background-color: transparent;
  text-align: center;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
`;
