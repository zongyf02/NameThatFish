import { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View, Text } from 'react-native';
import { ImageEditor } from 'expo-image-editor';

import style from './style';

/*
  Displays a camera preview page that allows user to crop or retake the image 
*/
const CameraPreview = ({ photo, resetCamera }) => {
  const [editorVisible, setEditorVisible] = useState(false);
  const [croppedImg, setCroppedImg] = useState(null);

  return (
    <View style={style.previewContiner}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={style.previewImgBg}
        resizeMode="contain"
      />
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
      <ImageEditor
        visible={editorVisible}
        onCloseEditor={() => setEditorVisible(false)}
        imageUri={photo.uri}
        fixedCropAspectRatio={4 / 3}
        lockAspectRatio={true}
        minimumCropDimensions={{
          width: 256,
          height: 256,
        }}
        onEditingComplete={(result) => {
          setCroppedImg(result);
        }}
        mode="full"
      />
    </View>
  );
};

export default CameraPreview;
