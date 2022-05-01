// Libraries
import { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import style from './style';

// Components
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import CameraPreview from './CameraPreview';
import { StatusBar } from 'expo-status-bar';

// Flux
import { useDispatch, useSelector } from 'react-redux';
import * as cameraTypes from '../../redux/reducers/camera/actionTypes';
import * as cameraSelectors from '../../redux/reducers/camera/reducer';

/*
  The Camera component allows the user to take a picture using their device
*/
const CameraPage = ({ navigation }) => {
  // state
  const CAMERA_TYPE = Camera.Constants.Type;
  const [type, setType] = useState(CAMERA_TYPE.back);
  const [mode, setMode] = useState('camera');
  const camera = useRef(Camera);

  // Screen Ratio and Img Padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3'); // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // returns `true` if the component is focused, `false` otherwise
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
  const cameraStatus = useSelector(cameraSelectors.getPermissionStatus);
  const photo = useSelector(cameraSelectors.getCapturedPhoto);

  // returns back to default camera state when component is not in focus
  useEffect(() => {
    if (!isFocused) setMode('camera');
  }, [isFocused]);

  // requests for permission upon initial render
  useEffect(() => {
    setMode('camera');
    if (cameraStatus !== 'granted') {
      requestCameraPermission();
    }
  }, []);

  // observes for photo effect, if modified and valid, set to preview mode
  useEffect(() => {
    console.log(photo);
    if (photo) setMode('preview');
  }, [photo]);

  const resetCamera = () => {
    setMode('camera');
  };

  // preps camera ratio
  const prepareRatio = async () => {
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await camera.current.getSupportedRatiosAsync();

      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      let desiredRatio = minDistance ? minDistance : '4:3';
      //  calculates the difference between the camera width and the screen height
      const remainder = Math.floor((height - realRatios[desiredRatio] * width) / 2);
      // sets the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  return (
    <SafeAreaView style={style.container}>
      {mode === 'camera' && isFocused && cameraStatus === 'granted' && (
        <Camera
          style={[style.camera, { marginBottom: imagePadding }]}
          ratio={ratio}
          type={type}
          ref={camera}
          onCameraReady={setCameraReady}
        >
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
      {mode === 'preview' && (
        <CameraPreview navigation={navigation} photo={photo} resetCamera={resetCamera} />
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default CameraPage;
