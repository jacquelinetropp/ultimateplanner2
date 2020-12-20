import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { firebaseReducer } from "react-redux-firebase";
import todoReducer from "./todoReducer";
import { firestoreReducer } from "redux-firestore";

export default combineReducers({
  auth: authReducer,
  todos: todoReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
