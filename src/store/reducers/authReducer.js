import * as actions from "../actions/actionTypes";

const initialState = {
  error: null,
  loading: false,
  verifyEmail: {
    error: null,
    loading: false,
  },
  recoverPassword: {
    loading: false,
    error: null,
  },
  profile: {
    loading: false,
    error: null,
  },
  deleteUser: {
    loading: false,
    error: null,
  },
};

//Helper functions

const authStart = (state) => {
  return { ...state, loading: true };
};

const authEnd = (state) => {
  return { ...state, loading: false };
};

const authFail = (state, payload) => {
  return { ...state, error: payload };
};

const authSuccess = (state) => {
  return { ...state, error: false };
};

const verifyStart = (state) => {
  return {
    ...state,
    verifyEmail: { ...state.verifyEmail, loading: true },
  };
};

const verifySuccess = (state) => {
  return {
    ...state,
    verifyEmail: { ...state.verifyEmail, loading: false, error: false },
  };
};

const verifyFail = (state, payload) => {
  return {
    ...state,
    verifyEmail: { ...state.verifyEmail, loading: false, error: payload },
  };
};

const recoveryStart = (state) => {
  return {
    ...state,
    recoverPassword: { ...state.recoverPassword, loading: true },
  };
};

const recoverySuccess = (state) => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: false,
    },
  };
};

const recoveryFail = (state, payload) => {
  return {
    ...state,
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: payload,
    },
  };
};

const profileStart = (state) => {
  return {
    ...state,
    profile: { ...state.profile, loading: true },
  };
};

const profileFail = (state, payload) => {
  return {
    ...state,
    profile: { ...state.profile, loading: false, error: payload },
  };
};

const profileSuccess = (state) => {
  return {
    ...state,
    profile: { ...state.profile, loading: false, error: false },
  };
};

const deleteStart = (state) => {
  return { ...state, deleteUser: { ...state.deleteUser, loading: true } };
};

const deleteFail = (state, payload) => {
  return {
    ...state,
    deleteUser: { ...state.deleteUser, loading: false, error: payload },
  };
};

const cleanUp = (state) => {
  return {
    ...state,
    error: null,
    loading: false,
    verifyEmail: {
      ...state.verifyEmail,
      loading: false,
      error: null,
    },
    recoverPassword: {
      ...state.recoverPassword,
      loading: false,
      error: null,
    },
    profileEdit: {
      ...state.profileEdit,
      loading: false,
      error: null,
    },
    deleteUser: {
      ...state.deleteUser,
      loading: false,
      error: null,
    },
  };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.AUTH_START:
      return authStart(state);

    case actions.AUTH_END:
      return authEnd(state);

    case actions.AUTH_FAIL:
      return authFail(state, payload);

    case actions.AUTH_SUCCESS:
      return authSuccess(state);

    case actions.VERIFY_START:
      return verifyStart(state);

    case actions.VERIFY_SUCCESS:
      return verifySuccess(state);

    case actions.VERIFY_FAIL:
      return verifyFail(state, payload);

    case actions.RECOVERY_START:
      return recoveryStart(state);

    case actions.RECOVERY_SUCCESS:
      return recoverySuccess(state);

    case actions.RECOVERY_FAIL:
      return recoveryFail(state, payload);

    case actions.PROFILE_START:
      return profileStart(state);

    case actions.PROFILE_SUCCESS:
      return profileSuccess(state);

    case actions.PROFILE_FAIL:
      return profileFail(state, payload);

    case actions.DELETE_START:
      return deleteStart(state);

    case actions.DELETE_FAIL:
      return deleteFail(state, payload);

    case actions.CLEAN_UP:
      return cleanUp(state);

    default:
      return state;
  }
};
