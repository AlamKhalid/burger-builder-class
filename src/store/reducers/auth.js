import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
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
    case actionsTypes.AUTH_LOGOUT:
      return { ...state, token: null, userId: null };
    case actionsTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
