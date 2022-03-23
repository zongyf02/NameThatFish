import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

const HomeScreenView = () => {
  const test = {
    a: 'test',
    c: 'test123',
  };

  const final = {
    ...test,
    d: 'test1235',
  };

  return (
    <View style={styles.container}>
      <Text>Testing HomeScreen!</Text>{' '}
      <Text>{'testing babel spread operator: ' + JSON.stringify(final)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
});

export default HomeScreenView;
