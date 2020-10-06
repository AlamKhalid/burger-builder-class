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
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDw0AVtF5-_LWMUELAymalhRpNZ_JCDxws";
      if (!isSignUp)
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDw0AVtF5-_LWMUELAymalhRpNZ_JCDxws";
      const response = await axios.post(url, authData);
      console.log(response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
    } catch (ex) {
      console.log(ex);
      dispatch(authFail(ex));
    }
  };
};
