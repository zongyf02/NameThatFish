import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

// stylesheet for camera
export default StyleSheet.create({
  camera: {
    flex: 1,
    zIndex: 5,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    top: 8,
  },
  capture: {
    backgroundColor: '#f5f6f5',
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    top: height * 0.65,
  },
  previewContiner: {
    backgroundColor: 'transparent',
    flex: 1,
    padding: 0,
    zIndex: 2,
    marginTop: 5,
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
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  cropButton: {
    zIndex: 10,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: 12,
    marginTop: 20,
  },
  label: {
    fontWeight: '900',
    fontFamily: 'sans-serif',
    color: '#00a4e6',
  },
  labelBtnContainer: {
    position: 'absolute',
    top: 30,
    height: 60,
    width: '100%',
    opacity: 0.5,
    backgroundColor: 'black',
    zIndex: 9,
  },
  saveBtn: {
    zIndex: 11,
    height: 30,
    width: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: width / 2 - 50,
    top: height * 0.8,
  },
  checkmarkWrapper: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
});
