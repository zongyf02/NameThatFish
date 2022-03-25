import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Camera } from 'expo-camera';
import * as cameraTypes from '../../redux/reducers/camera/actionTypes';

/*
  The Camera component allows the user to take a picture using their device
*/
const Camera = () => {
  // dispatcher
  const dispatch = useDispatch();
  const requestCameraPermission = () => {
    dispatch({ type: cameraTypes.CAMERA_PERMISSION_REQUESTED });
  };
  // selectors
  const cameraPermitted = useSelector();

  return (
    // <View>
    //   <Text>Testing Camera!</Text>
    // </View>
    <Camera style={{}}></Camera>
  );
};

export default Camera;
