import axios from "axios";

export function postAxios(url, body = {}, params = {}) {
  return axios.post(url, body, params);
}
export function getAxios(url, params = {}) {
  return axios.get(url, params);
}

export function patchAxios(url, body = {}, config = {}) {
  return axios.patch(url, body, config);
}

export function deleteAxios(url, config = {}) {
  return axios.delete(url, config);
}
