import axios from 'axios';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import querystring from 'query-string';
import {CANCEL} from 'redux-saga'
import {call, fork, select, take} from 'redux-saga/effects';

const getHeaders = (contentType = 'application/json') => {
  return {
    'Content-Type': contentType,
    'Access-Control-Expose-Headers': 'Content-Disposition',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'If-Modified-Since': '0'
  };
};

export const SERVICE_UNAVAILABLE_MESSAGE = 'Сервис временно недоступен';
export const SESSION_HAS_EXPIRED_MESSAGE = 'Истекло время сессии';

export const HttpMethod = {
  OPTIONS: 'options',
  GET: 'get',
  HEAD: 'head',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  TRACE: 'trace',
  CONNECT: 'connect',
  PATCH: 'patch'
};

export function isSuccessStatusCode(statusCode) {
  return statusCode >= 200 && statusCode < 300;
}

export function isUnauthorizedStatusCode(statusCode) {
  return statusCode === 401;
}

export function isServiceUnavailableTemporarilyStatusCode(statusCode) {
  return statusCode === 503;
}

export function isServiceUnavailableTotallyStatusCode(statusCode) {
  return statusCode === 502 || statusCode === 504;
}

export function isFailureStatusCode(statusCode) {
  return statusCode >= 400;
}

function fetchWrapper(options) {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const request = axios({...options, cancelToken: source.token}).catch((error) => error.response);
  request[CANCEL] = () => source.cancel();
  return request;
}

function getApiVersionFromPath(path) {
  const result = path.match(/^v[\d]*\//g);
  if (result) {
    return result[0].replace('v','').replace('/');
  }
}

function paramsSerializer(params) {
  return querystring.stringify(params, {arrayFormat: 'none'});
}

export function* fetchApi(path, {
  method = HttpMethod.GET,
  query,
  headers,
  responseType,
  contentType,
  data,
  showErrorNotification = true
}) {

  const options = {
    method,
    url: path,
    headers: {...getHeaders(contentType), ...headers},
    params: query,
    responseType,
    data: data && !(data instanceof FormData || isString(data)) ? JSON.stringify(data) : data,
    paramsSerializer: paramsSerializer
  };
  let response = yield call(fetchWrapper, options);

  if (isUndefined(response) || isServiceUnavailableTotallyStatusCode(response.status)) {
    console.log(response);
    return {message: SERVICE_UNAVAILABLE_MESSAGE};
  }

  while (isServiceUnavailableTemporarilyStatusCode(response.status)) {
    response = yield call(fetchWrapper, options);
  }

  if (isFailureStatusCode(response.status) && showErrorNotification) {
    console.log(response);
  }

  return response;
}
