import { all } from 'redux-saga/effects';
import { cameraSaga } from './cameraSaga';
import { imagesSaga } from './imagesSaga';

export default function* rootSaga() {
  yield all([...cameraSaga, ...imagesSaga]);
}

// logger middleware used for debugging
export const logger = (store) => (next) => (action) => {
  next(action);
  // avoids logging the camera object
  if (action.camera) {
    return;
  }
  console.log(action);
};
