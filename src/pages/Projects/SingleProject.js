import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import DeleteProject from "./DeleteProject";
import InputProject from "./InputProject";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 4rem 3rem;

  background-color: ${(props) => (props.active ? "rgba(237, 0, 126, .7)" : "#630052 ")};
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  margin-bottom: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-white);
  z-index: 0;
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

const StyledLink = styled(Link)`
  color: var(--color-white);
`;

const editStyles = {
  color: "var(--color-white)",
  margin: "0 .5rem",
  cursor: "pointer",
};

const deleteStyles = {
  color: "var(--color-errorRed)",
  margin: "0 .5rem",
  cursor: "pointer",
};

const SingleProject = ({ project, active }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Wrapper active={active}>
      <StyledLink to={`/${project.id}`}>{project.name}</StyledLink>
      <Controls>
        {" "}
        <i
          className="fas fa-edit"
          style={editStyles}
          onClick={() => setIsEditing(true)}
        />
        <i
          className="fas fa-trash-alt"
          style={deleteStyles}
          onClick={() => setIsDeleting(true)}
        />
      </Controls>
      <DeleteProject
        project={project}
        show={isDeleting}
        close={() => setIsDeleting(false)}
      />
      <InputProject
        project={project}
        opened={isEditing}
        close={() => setIsEditing(false)}
      />
    </Wrapper>
  );
};

export default SingleProject;
