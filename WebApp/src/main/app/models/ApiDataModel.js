import get from 'lodash/get';

export const ApiDataStatus = {
  BLANK: 'blank',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILURE: 'failure'
};

export const API_DATA_INSTANCE_ID = 'API_DATA_INSTANCE_ID';

export function getApiDataInstanceId() {
  return get(this, API_DATA_INSTANCE_ID);
}

export function createApiDataInstanceId(id) {
  return {[API_DATA_INSTANCE_ID]: id};
}

export function getData() {
  return get(this, 'data');
}

export function getError() {
  return get(this, 'error');
}

export function getStatus() {
  return get(this, 'status');
}

export function isApiDataBlank() {
  return !this || this::getStatus() === ApiDataStatus.BLANK
}

export function isApiDataPending() {
  return this::getStatus() === ApiDataStatus.PENDING
}

export function isApiDataSuccess() {
  return this::getStatus() === ApiDataStatus.SUCCESS
}

export function isApiDataFailure() {
  return this::getStatus() === ApiDataStatus.FAILURE
}