import { all } from 'redux-saga/effects';
import { cameraSaga } from './cameraSaga';

export default function* rootSaga() {
  yield all([...cameraSaga]);
}

// logger middleware used for debugging
export const logger = (store) => (next) => (action) => {
  next(action);
  if (action.camera) {
    return;
  }
  console.log(action);
};
