import * as actions from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_PROJECT_START:
      return { ...state, loading: true };

    case actions.ADD_PROJECT_SUCCESS:
      return { ...state, loading: false, error: false };

    case actions.ADD_PROJECT_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
