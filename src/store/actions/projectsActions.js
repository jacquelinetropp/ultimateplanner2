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
    // let projects = [];
    // const docs = await firestore
    //   .collection("projects")
    //   .where("userId", "==", userId)
    //   .get();
    // if (docs) {
    //   docs.forEach((doc) => {
    //     projects.push({
    //       id: doc.id,
    //       name: doc.data().name,
    //       userId: doc.data().userId,
    //       createdAt: doc.data().createdAt,
    //     });
    //   });
    let projects = [];
    await firestore
      .collection("projects")
      .where("userId", "==", userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          projects.push({
            id: doc.id,
            name: doc.data().name,
            userId: doc.data().userId,
            createdAt: doc.data().createdAt,
          });
        });
      });
    console.log(projects);
    dispatch({ type: actions.GET_PROJECT_SUCCESS, payload: projects });
  } catch (err) {
    dispatch({ type: actions.GET_PROJECT_FAIL, payload: err });
    console.log(err);
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
    console.log(project);

    dispatch({ type: actions.GET_PROJECT_SUCCESS, payload: project });
  } catch (err) {
    dispatch({ type: actions.GET_PROJECT_FAIL, payload: err });
    console.log(err);
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

    firestore.collection("projects").add(newProject);

    dispatch({ type: actions.ADD_PROJECT_SUCCESS });
    return true;
  } catch (err) {
    console.log(err);
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

//deleteproject
export const deleteProject = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  console.log("trying to delete");
  try {
    firestore.collection("projects").doc(id).delete();
    dispatch({ type: actions.DELETE_TODO_SUCCESS });
  } catch (err) {
    console.log(err);
    dispatch({ type: actions.DELETE_TODO_FAIL, payload: err.message });
  }
};
