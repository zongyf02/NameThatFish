import { requestCameraPermissionsAsync } from 'expo-camera';
import { call, put, takeLatest } from 'redux-saga';
import * as cameraTypes from './actionTypes/cameraTypes';
import cameraService from '../../services/camera';
import { Camera } from 'expo-camera';

export function* requestCameraPermission(action) {
  try {
    const { status } = yield call(cameraService.requestCameraPermissionsAsync);
    yield put({ type: cameraTypes.CAMERA_PERMISSION_SUCCESS, status });
  } catch (e) {
    yield put({ type: cameraTypes.CAMERA_PERMISSION_FAILED, message: e.message });
  }
}

export const cameraSaga = [
  takeLatest(cameraTypes.CAMERA_PERMISSION_REQUESTED, requestCameraPermission),
];
