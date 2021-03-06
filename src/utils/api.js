import axios from 'axios';
import config from '../config';

function createApiInstance() {
  return axios.create({
    baseURL: config.apiPath,
    headers: {
      'x-access-token': window.localStorage.getItem('ywc15AdminToken') || ''
    }
  });
}

function handleResponse(response) {
  if (response.data) {
    return response;
  }
  return Promise.reject(response.error);
}

function catchError(e) {
  return Promise.reject(e.response.data);
}

export default {
  get: path => (
    createApiInstance()
      .get(path)
      .then(handleResponse)
      .catch(catchError)
  ),
  post: (path, body = {}, headers = {}) => (
    createApiInstance()
      .request({
        url: path,
        method: 'POST',
        headers,
        data: body,
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  put: (path, body = {}) => (
    createApiInstance()
      .request({
        url: path,
        method: 'PUT',
        data: body,
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  delete: (path, body = {}) => (
    createApiInstance()
      .request({
        url: path,
        method: 'DELETE',
        data: body,
      })
      .then(handleResponse)
      .catch(catchError)
  ),
};
