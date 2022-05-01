import { call, put, takeLatest } from 'redux-saga/effects';
import * as imagesTypes from '../reducers/images/actionTypes';
import imagesService from '../../services/images';

export function* addPhotoToPhotos(action) {
  try {
    const photo = action.photo ? action.photo : yield call(imagesService.pickImageAsync);
    if (!photo) throw { message: 'add photo request cancelled' };
    else yield put({ type: imagesTypes.ADD_PHOTOS_SUCCESS, photo: photo });
  } catch (e) {
    yield put({ type: imagesTypes.ADD_PHOTOS_FAILED, message: e.message });
  }
}

export const imagesSaga = [takeLatest(imagesTypes.ADD_PHOTOS_REQUESTED, addPhotoToPhotos)];
