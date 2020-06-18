import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionsTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.idToken,
        userId: action.userId,
        error: null,
      };
    case actionsTypes.AUTH_FAIL:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default reducer;
