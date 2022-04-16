import * as ImagePicker from 'expo-image-picker';

class ImagesService {
  pickImageAsync = async () => {
    // No permissions request is necessary for launching the image library
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 1,
    });
    return !image.cancelled ? image.uri : null;
  };
}

export default new ImagesService();
