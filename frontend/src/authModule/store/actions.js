import { showMessage } from "../../components/messages/store/actions.js";
import { postAxios, getAxios, deleteAxios } from "../../utils/axios.js";
export const POST_NEW_USER = "[AUTH] POST_NEW_USER";
export const LOGGING = "[AUTH] LOGGING";
export const VALIDATE_LOGGIN = "[AUTH] VALIDATION_LOGGIN";
export const DELETE_TOKEN = "[AUTH] DELETE_TOKEN";

export function createUser(form) {
  return async (dispatch) => {
    try {
      let res = await postAxios("http://localhost:4000/oauth/user/create", form);
      if (res.data.valid) dispatch(showMessage("User created"));
      return res;
    } catch (error) {
      console.log("error: ", error);
    }
  };
}

export function logingUser(form) {
  return async (dispatch) => {
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      Object.keys(form).forEach((key) => params.append(key, form[key]));
      const res = await postAxios("http://localhost:4000/oauth/user/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: "Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW",
        },
      });
      if (!res.data.valid) dispatch(showMessage("Error on logging"));
      else
        return dispatch({ type: LOGGING, payload: res.data.data.accessToken });
    } catch (error) {
      console.log("error: ", error);
      dispatch(showMessage("Error on logging"));
      return error;
    }
  };
}

export function validateLogin(accessToken) {
  return async (dispatch) => {
    try {
      const res = await getAxios("http://localhost:4000/oauth/user/validate", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      return dispatch({ type: VALIDATE_LOGGIN, payload: res.data });
    } catch (error) {
      console.log("error: ", error);
      return dispatch({ type: DELETE_TOKEN });
    }
  };
}

export function logout() {
  return async (dispatch,getStore) => {
    try {
      const token =getStore().auth.token
      await deleteAxios("http://localhost:4000/oauth/user/token", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: DELETE_TOKEN });
    } catch (error) {
      console.log("error: ", error);
      dispatch(showMessage("Error on logging"));
      return error;
    }
  };
}
