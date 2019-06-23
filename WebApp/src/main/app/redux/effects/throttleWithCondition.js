import {fork, take, cancel, call, spawn} from 'redux-saga/effects';
import {delay} from 'redux-saga';

export function throttleWithCondition(time, condition, pattern, worker) {
  return fork(watchThrottleWithCondition, time, condition, pattern, worker);
}

function* watchThrottleWithCondition(time, condition, pattern, worker) {
  let lastAction = null;
  let lastExecutionTime = null;
  let timerTask = null;

  while (true) {
    const action = yield take(pattern);
    const conditionResult = yield* condition();
    if ((!lastExecutionTime || ((new Date()) - lastExecutionTime) > time) && conditionResult) {
      if (timerTask) {
        yield cancel(timerTask);
        timerTask = null;
      }
      lastExecutionTime = new Date();
      yield fork(worker, action);
    } else {
      lastAction = action;
      if (!timerTask) {
        function* task() {
          try {
            while (true) {
              yield call(delay, time);
              const conditionResult = yield* condition();
              if (conditionResult) {
                lastExecutionTime = new Date();
                yield spawn(worker, lastAction);
                yield cancel(timerTask);
              }
            }
          } finally {
            timerTask = null;
          }
        }

        timerTask = yield fork(task);
      }
    }
  }
}

