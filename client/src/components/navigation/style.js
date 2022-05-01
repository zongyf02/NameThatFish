import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  botTabBar: {
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 90,
    shadowColor: '#131615',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
  },
  iconLabel: {
    fontSize: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
});
