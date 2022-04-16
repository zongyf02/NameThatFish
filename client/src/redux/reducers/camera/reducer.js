import _ from 'lodash';
import * as cameraTypes from './actionTypes';

// redux state
const initialState = {
  cameraStatus: 'unauthorized',
  cameraErrMsg: null,
  photo: null,
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case cameraTypes.CAMERA_PERMISSION_SUCCESS:
      return { ...state, cameraStatus: action.cameraStatus };
    case cameraTypes.CAMERA_PERMISSION_FAILED:
      return { ...state, cameraStatus: action.cameraStatus, cameraErrMsg: action.message };
    case cameraTypes.CAMERA_CAPTURE_SUCCESS:
      return { ...state, photo: action.photo };
    case cameraTypes.CAMERA_CAPTURE_FAILED:
      return { ...state, cameraErrMsg: action.message };
    default:
      return state;
  }
}

// selectors
export const getPermissionStatus = (state) => {
  return state.camera.cameraStatus;
};

export const getCapturedPhoto = (state) => {
  return state.camera.photo;
};

export const getErrorMsg = (state) => {
  return state.camera.cameraErrMsg;
};
