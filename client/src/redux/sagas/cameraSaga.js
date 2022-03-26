import { call, put, takeLatest } from 'redux-saga/effects';
import * as cameraTypes from '../reducers/camera/actionTypes';
import cameraService from '../../services/camera';

export function* requestCameraPermission(action) {
  try {
    const { status } = yield call(cameraService.requestCameraPermissionsAsync, action.camera);
    yield put({ type: cameraTypes.CAMERA_PERMISSION_SUCCESS, cameraStatus: status });
  } catch (e) {
    yield put({ type: cameraTypes.CAMERA_PERMISSION_FAILED, message: e.message });
  }
}

export function* requestCameraCapture(action) {
  try {
    const photo = yield call(cameraService.requestCameraCaptureAsync, action.camera);
    yield put({ type: cameraTypes.CAMERA_CAPTURE_SUCCESS, photo: photo });
  } catch (e) {
    yield put({ type: cameraTypes.CAMERA_CAPTURE_FAILED, message: e.message });
  }
}

export const cameraSaga = [
  takeLatest(cameraTypes.CAMERA_PERMISSION_REQUESTED, requestCameraPermission),
  takeLatest(cameraTypes.CAMERA_CAPTURE_REQUESTED, requestCameraCapture),
];
