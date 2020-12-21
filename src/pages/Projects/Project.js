import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 4rem 3rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  margin-bottom: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-white);
  z-index: 5;
`;
const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 1rem;
  justify-content: center;
`;

const editStyles = {
  color: "var(--color-main)",
  margin: "0 .5rem",
  cursor: "pointer",
};

const deleteStyles = {
  color: "var(--color-errorRed)",
  margin: "0 .5rem",
  cursor: "pointer",
};

const Project = ({ project }) => {
  return (
    <Wrapper>
      {project.project}
      <Controls>
        {" "}
        <i className="fas fa-edit" style={editStyles} />
        <i className="fas fa-trash-alt" style={deleteStyles} />
      </Controls>
    </Wrapper>
  );
};

export default Project;
