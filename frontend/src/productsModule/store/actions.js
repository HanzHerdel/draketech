import { showMessage } from "../../components/messages/store/actions.js";
import {
  postAxios,
  getAxios,
  patchAxios,
  deleteAxios,
} from "../../utils/axios.js";
export const GET_PRODUCTS = "[PRODUCTS] GET_PRODUCTS";

export const GETING_PRODUCTS = "[PRODUCTS] GETING_PRODUCTS";
export const CREATE_PRODUCT = "[PRODUCTS] CREATE_PRODUCT";
export const UPDATE_PRODUCT = "[PRODUCTS] UPDATE_PRODUCT";
export const DELETE_PRODUCT = "[PRODUCTS] DELETE_PRODUCT";

export function getProducts(form) {
  return async (dispatch, store) => {
    try {
      const urlPost = "http://localhost:5000/products";
      let res = await getAxios(urlPost, form, getAuthHeader(store));
      if (res.data.valid) {
        dispatch({ type: GET_PRODUCTS, payload: res.data.data || [] });
      }
      return res.data;
    } catch (error) {
      dispatch(showMessage("Error getting products"));
      console.log("error: ", error);
    }
  };
}

export function postProduct(form) {
  return async (dispatch, store) => {
    try {
      const params = new FormData();
      Object.keys(form).forEach((key) => params.append(key, form[key]));
      const urlPost = "http://localhost:5000/products";
      let res = await postAxios(urlPost, form, getAuthHeader(store));
      if (res.data.valid) {
        dispatch(showMessage("Product Created"));
      }
      return res.data;
    } catch (error) {
      console.log("error: ", error);
      return { valid: false };
    }
  };
}

export function patchProduct(form, id) {
  return async (dispatch, store) => {
    try {
      const urlPatch = "http://localhost:5000/products/" + id;
      const res = await patchAxios(urlPatch, form, getAuthHeader(store));
      if (res.data.valid) {
        dispatch(showMessage("Product Edited"));
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch(showMessage("Error on put"));
      return { valid: false };
    }
  };
}

export function deleteProduct(id) {
  return async (dispatch, store) => {
    try {
      const urlDel = "http://localhost:5000/products/" + id;
      await deleteAxios(urlDel, getAuthHeader(store));
      return dispatch({ type: DELETE_PRODUCT, payload: id });
    } catch (error) {
      console.log("error: ", error);
      return { valid: false };
    }
  };
}

/**
 * * get the Bearer tocken header from store
 * @param store main store object
 */
function getAuthHeader(getState, urlEncoded = false) {
  const auth = getState().auth;
  return {
    headers: {
      authorization: `Bearer ${auth.token}`,
      ...(urlEncoded
        ? {
            "Content-Type": "multipart/form-data",
          }
        : {}),
    },
  };
}
