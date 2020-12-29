import React from "react";
import styled from "styled-components";
import Todos from "../../pages/Todos/Todos";
import Project from "../Projects/Project";
import { useParams } from "react-router-dom";

const TodosWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TodosLayout = () => {
  const { id } = useParams();
  console.log({ id });
  return (
    <TodosWrapper>
      <Project id={id} />
      <Todos id={id} />
    </TodosWrapper>
  );
};

export default TodosLayout;
