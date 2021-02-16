import * as actions from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  projects: [],
  currentProject: [],
  getProject: {
    loading: false,
    error: null,
  },
  deleteProject: {
    error: null,
    loading: false,
  },
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_PROJECT_START:
      return { ...state, loading: true };

    case actions.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case actions.ADD_PROJECT_FAIL:
      return { ...state, loading: false, error: payload };

    case actions.GET_PROJECT_START:
      return {
        ...state,
        getProject: {
          ...state.getProject,
          loading: true,
        },
      };

    case actions.GET_PROJECT_SUCCESS:
      return {
        ...state,
        projects: payload,
        getProject: {
          ...state.getProject,
          loading: false,
          error: false,
        },
      };
    
      case actions.ONE_PROJECT_SUCCESS:
        return {
          ...state,
          currentProject: payload,
          getProject: {
            ...state.getProject,
            loading: false,
            error: false,
          },
        };

    case actions.GET_PROJECT_FAIL:
      return {
        ...state,
        getProject: {
          ...state.getProject,
          loading: false,
          error: payload,
        },
      };

    case actions.DELETE_PROJECT_START:
      return {
        ...state,
        deleteProject: {
          ...state.deleteProject,
          loading: true,
        },
      };


    case actions.DELETE_PROJECT_SUCCESS:
      return {
        ...state,

        deleteProject: {
          ...state.deleteProject,
          loading: false,
          error: false,
        },
      };

    case actions.DELETE_PROJECT_FAIL:
      return {
        ...state,
        deleteProject: {
          ...state.deleteProject,
          loading: false,
          error: payload,
        },
      };

    case actions.PROJECT_CLEANUP:
      return {
        ...state,
        loading: false,
        error: null,
        projects: null,
        getProject: {
          ...state.getProject,
          loading: false,
          error: null,
        },
        deleteProject: {
          ...state.deleteProject,
          error: null,
          loading: false,
        },
      };
    default:
      return state;
  }
};

export default projectReducer;
