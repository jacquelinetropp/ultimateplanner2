import React from "react";
import styled from "styled-components";
import Todos from "../../pages/Todos/Todos";
import Projects from "../../pages/Projects/Projects";

const TodosWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TodosLayout = () => {
  return (
    <TodosWrapper>
      <Projects />
      <Todos />
    </TodosWrapper>
  );
};

export default TodosLayout;
