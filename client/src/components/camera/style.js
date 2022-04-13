import { StyleSheet } from 'react-native';

// stylesheet for camera
export default StyleSheet.create({
  camera: {
    flex: 1,
    zIndex: 5,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  flipCamera: {
    position: 'absolute',
    left: 3,
    top: 3,
  },
  capture: {
    backgroundColor: '#f5f6f5',
    borderRadius: 5,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: 'flex-end',
    marginBottom: 60,
  },
  previewContiner: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
  },
  previewImgBg: {
    flex: 1,
    marginTop: -100,
    backgroundColor: 'black',
  },
  retakeButton: {
    zIndex: 10,
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 12,
    marginTop: 15,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  cropButton: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: 12,
    marginTop: 15,
  },
  label: {
    fontWeight: '900',
    fontFamily: 'sans-serif',
    color: '#00a4e6',
  },
  labelBtnContainer: {
    position: 'absolute',
    height: 50,
    width: '100%',
    opacity: 0.65,
    backgroundColor: 'lightgrey',
    zIndex: 9,
  },
});
