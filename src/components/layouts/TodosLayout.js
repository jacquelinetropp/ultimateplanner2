import React, {useEffect} from "react";
import styled from "styled-components";
import Todos from "../../pages/Todos/Todos";
import { useParams } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";

import ProjectsSidebar from "../Projects/ProjectsSidebar";
import ProjectsDrawer from "../../pages/Projects/ProjectsDrawer";

const TodosWrapper = styled.div`
  display: flex;
  /* grid-template-columns: 250px auto;

  @media ${(props) => props.theme.mediaQueries.medium} {
    grid-template-columns: 200px auto;
  }

  @media ${(props) => props.theme.mediaQueries.small} {
    grid-template-columns: minmax(50px, 150px) auto;
  } */
  width: 100%;
`;

const TodosLayout = ({getOneProject}) => {
  const { id } = useParams();
  useEffect(() => {
    getOneProject(id);
  },);

  return (
    <TodosWrapper>
      <ProjectsDrawer id={id}/>
      <ProjectsSidebar id={id} />
      <Todos id={id} />
    </TodosWrapper>
  );
};
const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  getOneProject: actions.getOneProject
}


export default connect(null, mapDispatchToProps)(TodosLayout);
