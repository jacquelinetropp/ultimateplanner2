import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
import projectsReducer from "./projectsReducer";

export default combineReducers({
  auth: authReducer,
  todos: todoReducer,
  projects: projectsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
