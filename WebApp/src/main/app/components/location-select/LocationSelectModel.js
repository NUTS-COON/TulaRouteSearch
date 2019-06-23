import size from 'lodash/size';
import {call, fork, put, select, takeEvery} from 'redux-saga/effects';
import {debounce} from '../../redux/effects/debounce';
import {createApiData, reduceApiData, resetApiData} from '../../redux/ApiDataModel';
import {getData, isApiDataSuccess} from '../../models/ApiDataModel';

const FOUND_LOCATIONS_API_DATA_KEY = 'LocationSelect.FOUND_LOCATIONS_API_DATA_KEY';
const INSTANCE_ACTION_KEY = 'LocationSelect.INSTANCE_ACTION_KEY';

export const SUGGESTED_PERSONS_MAX_COUNT = 15;

const LocationSelectAction = {
  SEARCH_LOCATIONS: 'LocationSelectAction.SEARCH_LOCATIONS',
  CHANGE_SEARCH_VALUE: 'LocationSelectAction.CHANGE_SEARCH_VALUE',
  SET_FOUND_LOCATIONS: 'LocationSelectAction.SET_FOUND_LOCATIONS',
  RESET_SEARCH_RESULT: 'LocationSelectAction.RESET_SEARCH_RESULT',
  RESET_FOUND_LOCATIONS_AND_COUNT: 'LocationSelectAction.RESET_FOUND_LOCATIONS_AND_COUNT',
  RESET_COMPONENT_DATA: 'LocationSelectAction.RESET_COMPONENT_DATA'
};

export function searchLocationsAction(id, search) {
  return {type: LocationSelectAction.SEARCH_LOCATIONS, payload: {id, search}};
}

export function changeSearchValueAction(id, searchValue) {
  return {
    type: LocationSelectAction.CHANGE_SEARCH_VALUE,
    payload: {[INSTANCE_ACTION_KEY]: id, searchValue: searchValue}
  };
}

function setFoundLocationsAction(id, foundLocations) {
  return {type: LocationSelectAction.SET_FOUND_LOCATIONS, payload: {[INSTANCE_ACTION_KEY]: id, foundLocations}};
}

export function resetComponentDataAction(id) {
  return {type: LocationSelectAction.RESET_COMPONENT_DATA, payload: {[INSTANCE_ACTION_KEY]: id}};
}

export function resetSearchResultAction(id) {
  return {type: LocationSelectAction.RESET_SEARCH_RESULT, payload: {id}};
}

export function resetFoundPersonsAndCountAction(id) {
  return {type: LocationSelectAction.RESET_FOUND_LOCATIONS_AND_COUNT, payload: {[INSTANCE_ACTION_KEY]: id}};
}

const DEFAULT_STATE = {
  instances: {}
};

const DEFAULT_INSTANCE_STATE = {
  count: 0,
  foundLocations: [],
  searchValue: ''
};

export function reduceLocationSelect(state = DEFAULT_STATE, action = {}) {
  const {type, payload} = action;

  const id = payload && payload[INSTANCE_ACTION_KEY];

  if (id) {
    state = {...state, instances: {...state.instances}};

    state.instances[id] = {
      ...DEFAULT_INSTANCE_STATE,
      ...state.instances[id]
    };

    state.instances[id] = reduceApiData(state.instances[id], FOUND_LOCATIONS_API_DATA_KEY, action);

    switch (type) {
      case LocationSelectAction.RESET_COMPONENT_DATA: {
        state.instances[id] = {...DEFAULT_INSTANCE_STATE};
        break;
      }
      case LocationSelectAction.CHANGE_SEARCH_VALUE: {
        state.instances[id].searchValue = action.payload.searchValue;
        state.instances[id].foundLocations = [];
        break;
      }
      case LocationSelectAction.SET_FOUND_LOCATIONS: {
        state.instances[id].foundLocations = action.payload.foundLocations;
        break;
      }
      case LocationSelectAction.RESET_FOUND_LOCATIONS_AND_COUNT: {
        state.instances[id].foundLocations = [];
        break;
      }
    }
  }

  return state;
}

function selectLocationSelect(state) {
  return state.locationSelect;
}


function selectInstance(state, id) {
  return selectLocationSelect(state).instances[id] || {};
}

export function selectFoundLocationsApiData(state, id) {
  return selectInstance(state, id)[FOUND_LOCATIONS_API_DATA_KEY];
}

export function selectSearchValue(state, id) {
  return selectInstance(state, id).searchValue;
}

export function selectFoundLocations(state, id) {
  return selectInstance(state, id).foundLocations;
}

function* searchLocationsSaga({payload: {search, id}}) {
  console.log('start');
  const foundLocationsApiData = yield call(createApiData, FOUND_LOCATIONS_API_DATA_KEY, 'http://routesearcherapi.azurewebsites.net/api/RouteSearcher/GetSuggestions', {text: search});
  if (foundLocationsApiData::isApiDataSuccess()) {
    const result = foundLocationsApiData::getData();
    console.log('there');
    yield put(setFoundLocationsAction(id, result));
  }
}


function* resetSearchResultSaga({payload: {id}}) {
  yield put(resetApiData(FOUND_LOCATIONS_API_DATA_KEY, {[INSTANCE_ACTION_KEY]: id}));
  yield put(resetFoundPersonsAndCountAction(id));
}

function* watch() {
  yield debounce(100, LocationSelectAction.SEARCH_LOCATIONS, searchLocationsSaga, LocationSelectAction.RESET_SEARCH_RESULT);
  yield takeEvery(LocationSelectAction.RESET_SEARCH_RESULT, resetSearchResultSaga);
}

export function* watchLocationSelect() {
  yield fork(watch);
}
