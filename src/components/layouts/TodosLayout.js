import React, {useEffect} from "react";
import styled from "styled-components";
import Todos from "../../pages/Todos/Todos";
import { useParams } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";

import ProjectsSidebar from "../Projects/ProjectsSidebar";

const TodosWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;

  @media ${(props) => props.theme.mediaQueries.small} {
    grid-template-columns: 150px auto;
  }
  width: 100%;
`;

const TodosLayout = ({getOneProject}) => {
  const { id } = useParams();
  useEffect(() => {
    getOneProject(id);
  },);

  return (
    <TodosWrapper>
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
