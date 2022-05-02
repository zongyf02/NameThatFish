import { call, put, takeLatest } from 'redux-saga/effects';
import * as modelTypes from '../reducers/model/actionTypes';
import modelService from '../../services/model';

export function* requestResultFromModel(action) {
  try {
    const result = yield call(modelService.requestModelResultAsync, { photo: action.photo });
    if (result.error) throw { message: result.error };
    yield put({ type: modelTypes.GET_RESULT_SUCCESS, result: result, id: action.id });
  } catch (e) {
    yield put({ type: modelTypes.GET_RESULT_FAILED, message: e.message });
  }
}

export const modelSaga = [takeLatest(modelTypes.GET_RESULT_REQUESTED, requestResultFromModel)];
