import { Platform, StyleSheet, StatusBar } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    color: '#52647A',
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: 350,
    height: 300,
    alignSelf: 'center',
    marginLeft: 36,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#011936',
    fontSize: 36,
    fontWeight: '600',
    paddingVertical: 12,
  },
  otherImage: {
    height: 100,
    width: 100,
    backgroundColor: '#DAE0E6',
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  otherImageContainer: {
    flexDirection: 'column',
  },
  scientificName: {
    color: '#00000087',
    fontSize: 20,
    paddingBottom: 20,
  },
  subTitle: {
    color: '#00000087',
    fontSize: 24,
    fontWeight: '500',
    paddingVertical: 12,
  },
});
