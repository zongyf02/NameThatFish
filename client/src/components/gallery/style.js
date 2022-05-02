import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  item: {
    width: screenWidth - 125,
    height: screenWidth,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 15,
  },
  infoContainer: {
    backgroundColor: '#00a4e675',
    padding: 8,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#FFFFFF',
    marginLeft: 6,
    flexWrap: 'wrap',
    width: '90%',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  itemLabel: {
    color: 'grey',
    opacity: 0.35,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  galleryTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00a4e6',
    opacity: 0.7,
  },
  galleryIcon: {
    color: 'black',
    opacity: 0.5,
  },
});
