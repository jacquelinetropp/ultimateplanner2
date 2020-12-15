import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 1rem 2rem;
  background-color: var(--color-main);
  border: none;
`;

const Input = ({ field, form: { touched, errors }, ...props }) => {
  return <StyledInput {...field} {...props} />;
};

export default Input;
