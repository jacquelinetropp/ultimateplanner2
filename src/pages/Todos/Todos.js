import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Forms/Button";
import * as actions from "../../store/actions/index";
import styled from "styled-components";

import Heading from "../../components/UI/Headings/Headings";
import InputTodo from "./InputTodo";
import Todo from './Todo';

import Loader from '../../components/UI/Loader/Loader';

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLight);
  z-index: 5;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2rem;
`;

const Todos = ({ id, logout, getTodos, currentTodos, loading }) => {
  useEffect(() => {
    getTodos(id);
  }, []);
  const [isAdding, setIsAdding] = useState(false);

  let content;

  if (!currentTodos || loading) {
    content = (
      <Content>
        <Loader />
      </Content>
    );
  } 
  // else if (!todos[userId] || !todos[userId].todos) {
  //   content = (
  //     <Content>
  //       <Heading color="white" size="h2">
  //         You have no todos!
  //       </Heading>
  //     </Content>
  //   );}
  //    else if (todos.length == 0) {
  //   content = (
  //     <Content>
  //       <Heading color="white" size="h2">
  //         You have no todos!
  //       </Heading>
  //     </Content>
  //   );
  // } 
  else {
    content = (
      <Content>
        {currentTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
      </Content>
    );
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <Heading nomargin size="h1" color="white">
          Your Todos
        </Heading>
        <Heading size="h4" bold color="white">
          All you have to do for now...
        </Heading>
        <Button color="main" contain onClick={() => setIsAdding(true)}>
          Add Todo
        </Button>
        <InputTodo opened={isAdding} close={() => setIsAdding(false)} />
        {content}
        <Button color="main" onClick={() => logout()}>
          Logout
        </Button>
      </InnerWrapper>
    </Wrapper>
  );
};
const mapStateToProps = ({ firebase, firestore, todos }) => ({
  // userId: firebase.auth.uid,
  // todos: firestore.data.todos,
  // requesting: firestore.status.requesting,
  // fetched: firestore.status.requested,
  currentTodos: todos.currentTodos,
  loading: todos.loading
});

const mapDispatchToProps = {
  logout: actions.signOut,
  getTodos: actions.getTodos,
};

export default connect(null, mapDispatchToProps)(Todos);
