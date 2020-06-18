import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email, pass, isSignUp) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = { email, password: pass, returnSecureToken: true };
    try {
      const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyDw0AVtF5-_LWMUELAymalhRpNZ_JCDxws";
      if (!isSignUp) url = "";
      const response = await axios.post(url, authData);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    } catch (ex) {
      dispatch(authFail());
    }
  };
};
