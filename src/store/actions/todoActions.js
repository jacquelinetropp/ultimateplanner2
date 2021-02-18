import * as actions from "./actionTypes";

//getTodos
export const getTodos = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  try {
   dispatch({type: actions.GET_TODO_START});
    const todos = await firestore
    .collection("todos")
    .where("key", "==", id);

  todos.onSnapshot((snapshot) => {
    let todos = [];
    snapshot.docs.forEach((doc) => {
      todos.push({
        id: doc.id,
        todo: doc.data().todo,
        key: doc.data().key,
        createdAt: doc.data().createdAt,
      });
    });

    dispatch({type: actions.GET_TODO_SUCCESS, payload: todos}); 
  })
  } catch (err) {
    dispatch({type: actions.GET_TODO_FAIL, payload: err});
  }
};

//add todo
export const addTodo = (data, id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actions.ADD_TODO_START });
  try {
   const newTodo = {
      todo: data.todo,
      key: id,
      userId: userId, 
      createdAt: new Date().valueOf(),
    };
  
    let todo;
    await firestore.collection('todos')
    .add(newTodo)
    .then((docRef) => {
      todo = {
        ...newTodo,
        id: docRef.id
      }
    })
    
    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
 
  }
};

//delete todo
export const deleteTodo = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: actions.DELETE_TODO_START });
  try {
  
    firestore.collection('todos').doc(id).delete();
    dispatch({ type: actions.DELETE_TODO_SUCCESS });
  } catch (err) {

    dispatch({ type: actions.DELETE_TODO_FAIL, payload: err.message });
  }
};

//edit todo
export const editTodo = (id, data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: actions.ADD_TODO_START });
  try {
    const update = data.todo;
   
    await firestore.collection("todos").doc(id).update({
      todo: update,
    });
    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};
