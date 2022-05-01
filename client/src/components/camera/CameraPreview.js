// Libraries
import { useEffect, useState } from 'react';
import style from './style';

// Flux
import { useDispatch, useSelector } from 'react-redux';
import * as imagesTypes from '../../redux/reducers/images/actionTypes';

// Components
import { ImageBackground, TouchableOpacity, View, Text, TouchableHighlight } from 'react-native';
import { ImageEditor } from 'expo-image-editor';

/*
  Displays a camera preview page that allows user to crop or retake the image 
*/
const CameraPreview = ({ navigation, photo, resetCamera }) => {
  // states
  const [editorVisible, setEditorVisible] = useState(false);
  const [previewImg, setPreviewImg] = useState(photo);

  // dispatchers
  const dispatch = useDispatch();
  const savePhoto = () => {
    navigation.navigate('Home');
    dispatch({ type: imagesTypes.ADD_PHOTOS_REQUESTED, photo: previewImg.uri });
  };

  return (
    <View style={style.previewContiner}>
      {editorVisible ? (
        <ImageEditor
          visible={editorVisible}
          onCloseEditor={() => setEditorVisible(false)}
          imageUri={previewImg && previewImg.uri}
          lockAspectRatio={false}
          minimumCropDimensions={{
            width: 256,
            height: 256,
          }}
          onEditingComplete={(result) => {
            setPreviewImg(result);
          }}
          asView={true}
          mode="crop-only"
        />
      ) : (
        <>
          <ImageBackground
            source={{ uri: previewImg && previewImg.uri }}
            style={style.previewImgBg}
            resizeMode="contain"
          >
            <TouchableHighlight activeOpacity={0.7} style={style.saveBtn} onPress={savePhoto}>
              <Text style={style.label}>Confirm</Text>
            </TouchableHighlight>
          </ImageBackground>
          <View style={style.labelBtnContainer}>
            <TouchableOpacity style={style.retakeButton} onPress={resetCamera}>
              <Text style={style.label}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.cropButton}
              onPress={() => {
                setEditorVisible(true);
              }}
            >
              <Text style={style.label}>Crop</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CameraPreview;
