import isNil from 'lodash/isNil';
import {delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {API_DATA_INSTANCE_ID, ApiDataStatus, getApiDataInstanceId} from '../models/ApiDataModel';
import {fetchApi, HttpMethod, isSuccessStatusCode} from './NetworkModel';

export const ApiDataActionType = {
  START_REQUEST: 'ApiData.request',
  SAVE_SUCCESS_RESULT: 'ApiData.saveRequestResult',
  SAVE_FAILURE_RESULT: 'ApiData.saveFailureResult',
  RESET: 'ApiData.reset'
};

export function startRequest(apiDataKey, additionalPayload) {
  return {type: ApiDataActionType.START_REQUEST, payload: {apiDataKey, ...additionalPayload}};
}

export function saveSuccessResult(apiDataKey, data, additionalPayload) {
  return {type: ApiDataActionType.SAVE_SUCCESS_RESULT, payload: {apiDataKey, data, ...additionalPayload}};
}

export function saveFailureResult(apiDataKey, error, additionalPayload) {
  return {type: ApiDataActionType.SAVE_FAILURE_RESULT, payload: {apiDataKey, error, ...additionalPayload}};
}

export function resetApiData(apiDataKey, additionalPayload) {
  return {type: ApiDataActionType.RESET, payload: {apiDataKey, ...additionalPayload}};
}

export const API_DATA_DEFAULT_STATE = {
  data: null,
  error: null,
  status: ApiDataStatus.BLANK
};

export function reduceApiDataModel(storage = {}, action) {
  const {payload} = action;

  if (payload && payload.apiDataKey) {
    const {apiDataKey, [API_DATA_INSTANCE_ID]: instanceId} = payload;
    storage = {...storage};

    if (instanceId) {
      const currentApiDataKeyState = storage[apiDataKey] || {};
      const state = currentApiDataKeyState[instanceId] || {};
      const newState = reduceApiDataModelInternal(state, action);
      storage[apiDataKey] = {...currentApiDataKeyState, [instanceId]: newState};
      return storage;
    }

    storage[apiDataKey] = reduceApiDataModelInternal(storage[apiDataKey], action);

  }
  return storage;
}

export function reduceApiData(storage, apiDataKey, action) {
  const {payload} = action;

  if (payload && payload.apiDataKey === apiDataKey) {
    return reduceApiDataModel(storage, action);
  }
  return storage;
}


function reduceApiDataModelInternal(state, action) {
  const {type, payload} = action;
  state = {...API_DATA_DEFAULT_STATE, ...state};
  switch (type) {
    case ApiDataActionType.START_REQUEST:
      state.status = ApiDataStatus.PENDING;
      break;

    case ApiDataActionType.SAVE_SUCCESS_RESULT:
      if (state.status === ApiDataStatus.PENDING) {
        state.status = ApiDataStatus.SUCCESS;
        state.data = payload.data;
        state.error = null;
      }
      break;

    case ApiDataActionType.SAVE_FAILURE_RESULT:
      if (state.status === ApiDataStatus.PENDING) {
        state.status = ApiDataStatus.FAILURE;
        state.data = null;
        state.error = payload.error;
      }
      break;

    case ApiDataActionType.RESET:
      state = {...API_DATA_DEFAULT_STATE};
      break;
  }
  return state;
}

export function selectApiData(state, apiDataKey, instanceId) {
  if (!instanceId) {
    return state.apiData[apiDataKey];
  }

  const apiDataKeyState = state.apiData[apiDataKey] || {};
  return apiDataKeyState[instanceId] || {};
}

export function* fetchApiData(apiDataKey, path, options, additionalPayload) {
  yield put(startRequest(apiDataKey, additionalPayload));
  const result = yield call(fetchApi, path, options);
  if (isSuccessStatusCode(result.status)) {
    const resultData = result.data && !isNil(result.data.value) ? result.data.value : result.data;
    yield put(saveSuccessResult(apiDataKey, resultData, additionalPayload));
  } else {
    yield put(saveFailureResult(apiDataKey, result, additionalPayload));
  }
  return yield select(selectApiData, apiDataKey, additionalPayload::getApiDataInstanceId());
}

export function* readApiData(apiDataKey, path, options, additionalPayload) {
  return yield call(fetchApiData, apiDataKey, path, {method: HttpMethod.GET, ...options}, additionalPayload);
}

export function* createApiData(apiDataKey, path, data, options, additionalPayload) {
  return yield* fetchApiData(apiDataKey, path, {method: HttpMethod.POST, data, ...options}, additionalPayload);
}

export function* updateApiData(apiDataKey, path, data, options, additionalPayload) {
  return yield* fetchApiData(apiDataKey, path, {method: HttpMethod.PUT, data, ...options}, additionalPayload);
}

export function* patchApiData(apiDataKey, path, data, options, additionalPayload) {
  return yield* fetchApiData(apiDataKey, path, {method: HttpMethod.PATCH, data, ...options}, additionalPayload);
}

export function* deleteApiData(apiDataKey, path, options, additionalPayload) {
  return yield* fetchApiData(apiDataKey, path, {method: HttpMethod.DELETE, ...options}, additionalPayload);
}

