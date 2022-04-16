import { combineReducers } from 'redux';
import camera from './camera/reducer';
import images from './images/reducer';

// ## Generator Reducer Imports

export default combineReducers({
  camera,
  images,
});
