import _ from 'lodash';
import * as imagesTypes from './actionTypes';
import { Image } from 'react-native';
import DefaultImage from '../../../../assets/upload2.png';

const DEFAULT_PHOTO = Image.resolveAssetSource(DefaultImage).uri;

// redux state
const initialState = {
  photos: [
    {
      id: 0,
      showText: true,
      title: 'upload more',
      photo: DEFAULT_PHOTO,
    },
  ],
  imagesErrMsg: '',
  idCount: 1,
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case imagesTypes.ADD_PHOTOS_SUCCESS:
      return {
        ...state,
        idCount: state.idCount + 1,
        photos: [
          ...state.photos,
          {
            id: state.idCount,
            showText: true,
            title: 'photo #' + state.idCount,
            photo: action.photo,
          },
        ],
      };
    case imagesTypes.ADD_PHOTOS_FAILED:
      return {
        ...state,
        imagesErrMsg: action.message,
      };
    case imagesTypes.CLEAR_PHOTOS:
      return initialState;
    default:
      return state;
  }
}

// selectors
export const getPhotos = (state) => {
  return state.images.photos;
};
