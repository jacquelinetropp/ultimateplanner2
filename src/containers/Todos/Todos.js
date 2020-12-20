import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../components/UI/Forms/Button";
import * as actions from "../../store/actions/index";
import styled from "styled-components";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import Heading from "../../components/UI/Headings/Headings";
import InputTodo from "./InputTodo";
import Todo from "./Todo";
import Loader from "../../components/UI/Loader/Loader";

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLight);
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

const Todos = ({ logout, todos, requested, userId }) => {
  const [isAdding, setIsAdding] = useState(false);

  let content;

  if (!todos) {
    content = (
      <Content>
        <Loader isWhite />
      </Content>
    );
  } else if (
    (!todos[userId] && requested[`todos/${userId}`]) ||
    todos[userId].todos.length === 0
  ) {
    content = (
      <Content>
        <Heading color="white" size="h2">
          You have no todos!
        </Heading>
      </Content>
    );
  } else {
    content = (
      <Content>
        {todos[userId].todos
          .slice(0)
          .reverse()
          .map((todo) => (
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
        <Button onClick={() => logout()}>Logout</Button>
      </InnerWrapper>
    </Wrapper>
  );
};
const mapStateToProps = ({ firebase, firestore }) => ({
  userId: firebase.auth.uid,
  todos: firestore.data.todos,
  requesting: firestore.status.requesting,
  fetched: firestore.status.requested,
});

const mapDispatchToProps = {
  logout: actions.signOut,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [`todos/${props.userId}`])
)(Todos);
