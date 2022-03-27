import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Camera } from 'expo-camera';
import * as cameraTypes from '../../redux/reducers/camera/actionTypes';
import * as cameraSelectors from '../../redux/reducers/camera/reducer';
import { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import style from './style';
/*
  The Camera component allows the user to take a picture using their device
*/
const CameraPage = () => {
  // state
  const CAMERA_TYPE = Camera.Constants.Type;
  const [type, setType] = useState(CAMERA_TYPE.back);

  const camera = useRef(Camera);
  // This hook returns `true` if the screen is focused, `false` otherwise
  const isFocused = useIsFocused();

  // dispatchers
  const dispatch = useDispatch();
  const requestCameraPermission = () => {
    dispatch({ type: cameraTypes.CAMERA_PERMISSION_REQUESTED, camera: camera });
  };
  const takePicture = () => {
    dispatch({ type: cameraTypes.CAMERA_CAPTURE_REQUESTED, camera: camera });
  };

  // selectors
  const cameraStatus = useSelector((state) => cameraSelectors.getPermissionStatus(state));
  const photo = useSelector((state) => cameraSelectors.getCapturedPhoto(state));

  useEffect(() => {
    if (cameraStatus !== 'granted') {
      requestCameraPermission();
    }
  }, []);

  return (
    <View style={style.container}>
      {isFocused && cameraStatus === 'granted' && (
        <Camera style={style.camera} type={type} ref={camera}>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              style={style.flipCamera}
              onPress={() => {
                setType(type === CAMERA_TYPE.back ? CAMERA_TYPE.front : CAMERA_TYPE.back);
              }}
            >
              <MaterialIcons name="flip-camera-ios" size={24} color="#00a4e6" />
            </TouchableOpacity>
            <TouchableHighlight activeOpacity={0.7} style={style.capture} onPress={takePicture}>
              <View />
            </TouchableHighlight>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default CameraPage;
