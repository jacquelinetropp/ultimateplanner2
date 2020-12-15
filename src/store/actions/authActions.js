export const signUp = (data) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    const res = await firestore
      .auth()
      .createUserwithEmailAndPassword(data.email, data.password);
    console.log(res);
  } catch (err) {}
};
