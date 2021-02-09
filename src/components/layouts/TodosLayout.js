import React, {useEffect} from "react";
import styled from "styled-components";
import Todos from "../../pages/Todos/Todos";
import Project from "../Projects/Project";
import { useParams } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";

const TodosWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TodosLayout = ({getOneProject}) => {
  const { id } = useParams();
  useEffect(() => {
    getOneProject(id);
  },);

  return (
    <TodosWrapper>
      <Project id={id} />
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
