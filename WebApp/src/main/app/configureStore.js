import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reduxBatch}  from '@manaflair/redux-batch';
import {reduceHome, watchHome} from './pages/home/HomePageModel';
import {reduceApiDataModel} from './redux/ApiDataModel';
import {fork} from 'redux-saga/effects';
import {reduceLocationSelect, watchLocationSelect} from './components/location-select/LocationSelectModel';

function* rootSaga() {
  yield fork(watchHome);
  yield fork(watchLocationSelect);
}


const composeEnhancers = compose;

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      apiData: reduceApiDataModel,
      home: reduceHome,
      locationSelect: reduceLocationSelect
    }),
    composeEnhancers(reduxBatch, applyMiddleware(sagaMiddleware), reduxBatch),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}