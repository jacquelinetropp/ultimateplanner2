import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DeleteProject from "../../pages/Projects/DeleteProject";
import * as actions from "../../store/actions";

const deleteStyles = {
  color: "var(--color-errorRed)",
  margin: "0 .5rem",
  cursor: "pointer",
};

const Project = ({ getOneProject, project, id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    getOneProject(id);
  }, [getOneProject]);

  return (
    <div>
      <p>
        {" "}
        Hello, My id is {id}. My project name is {project.name}.{" "}
      </p>{" "}
      <i
        className="fas fa-trash-alt"
        style={deleteStyles}
        onClick={() => setIsDeleting(true)}
      />
      <DeleteProject project={project} />
    </div>
  );
};

const mapStateToProps = ({ projects }) => ({
  project: projects.projects,
});

const mapDispatchToProps = {
  getOneProject: actions.getOneProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);