import * as actions from "./actionTypes";

//get all Projects
export const getProjects = () => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.GET_PROJECT_START });
  try {

    const projectsMos = await firestore
      .collection("projects")
      .where("userId", "==", userId);

    projectsMos.onSnapshot((snapshot) => {
      let projects = [];
      snapshot.docs.forEach((doc) => {
        projects.push({
          id: doc.id,
          name: doc.data().name,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
        });
      });
      dispatch({ type: actions.GET_PROJECT_SUCCESS, payload: projects });
    });
  } catch (err) {
    dispatch({ type: actions.GET_PROJECT_FAIL, payload: err });

  }
};

//get one project
export const getOneProject = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  dispatch({ type: actions.GET_PROJECT_START });
  try {
    const snapshot = await firestore.collection("projects").doc(id).get();

    const project = await snapshot.data();

    dispatch({ type: actions.ONE_PROJECT_SUCCESS, payload: project });
  } catch (err) {
    dispatch({ type: actions.GET_PROJECT_FAIL, payload: err });

  }
};

//add Project
export const addProject = (data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actions.ADD_PROJECT_START });
  try {
    const newProject = {
      name: data.project,
      userId: userId,
      createdAt: new Date().toISOString(),
    };

    await firestore
      .collection("projects")
      .add(newProject)
 
    dispatch({ type: actions.ADD_PROJECT_SUCCESS });
    return true;
  } catch (err) {

    dispatch({ type: actions.ADD_PROJECT_FAIL, payload: err.message });
  }
};

//edit project
export const editProject = (id, data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  dispatch({ type: actions.ADD_PROJECT_START });
  try {
    const update = data.project;


    await firestore.collection("projects").doc(id).update({
      name: update,
    });

    dispatch({ type: actions.ADD_PROJECT_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_PROJECT_FAIL, payload: err.message });
  }
};

//deleteproject
export const deleteProject = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  dispatch({ type: actions.DELETE_PROJECT_START });
  try {

    firestore.collection("todos").where("key", "==", id).get()
    .then(querySnapshot => {
      let batch = firestore.batch();
      querySnapshot.forEach(doc => {
        batch.delete(doc.ref)
      })
      return batch.commit()
    });

    firestore.collection("projects").doc(id).delete();

    dispatch({ type: actions.DELETE_PROJECT_SUCCESS });
  } catch (err) {

    dispatch({ type: actions.DELETE_PROJECT_FAIL, payload: err.message });
  }
};

export const projectCleanUp = () => ({
  type: actions.PROJECT_CLEANUP,
});
