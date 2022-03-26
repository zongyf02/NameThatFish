class CameraService {
  requestCameraPermissionsAsync = async (camera) => {
    return await camera.current.requestCameraPermissionsAsync();
  };

  requestCameraCaptureAsync = async (camera) => {
    return await camera.current.takePictureAsync();
  };
}

export default new CameraService();
