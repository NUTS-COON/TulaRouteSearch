import {call, cancel, fork, take, delay} from 'redux-saga/effects';
import compact from 'lodash/compact';

export function debounce(time, pattern, saga, cancellationPattern, ...args) {
  return fork(watchDebounce, time, pattern, saga, cancellationPattern, args);
}

function* watchDebounce(time, pattern, saga, cancellationPattern, ...args) {
  let task = null;

  function* delayedSaga(action) {
    yield delay(time);
    yield call(saga, action, ...args);
  }

  while (true) {
    const patterns = compact([pattern, cancellationPattern]);
    const action = yield take(patterns);
    if (task) {
      yield cancel(task);
    }
    if (action.type === pattern) {
      task = yield fork(delayedSaga, action);
    }
  }
}
