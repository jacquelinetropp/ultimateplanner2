import * as actions from "./actionTypes";

export const addProject = (data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actions.ADD_PROJECT_START });
  try {
    const res = await firestore.collection("projects").doc(userId).get();

    const newProject = {
      project: data.project,
      id: new Date().valueOf(),
    };
    if (!res.data()) {
      firestore
        .collection("projects")
        .doc(userId)
        .set({
          projects: [newProject],
        });
    } else {
      firestore
        .collection("projects")
        .doc(userId)
        .update({
          projects: [...res.data().projects, newProject],
        });
    }
    dispatch({ type: actions.ADD_PROJECT_SUCCESS });
    return true;
  } catch (err) {
    console.log(err.message);
    dispatch({ type: actions.ADD_PROJECT_FAIL, payload: err.message });
  }
};

//edit todo
export const editProject = (id, data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_PROJECT_START });
  try {
    const res = await firestore.collection("projects").doc(userId).get();
    const projects = res.data().projects;
    const index = projects.findIndex((project) => project.id === id);
    projects[index].project = data.project;

    await firestore.collection("projects").doc(userId).update({
      projects,
    });

    dispatch({ type: actions.ADD_PROJECT_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_PROJECT_FAIL, payload: err.message });
  }
};
