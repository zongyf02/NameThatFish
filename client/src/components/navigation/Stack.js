import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './style';
import { Entypo } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

const StackNav = ({ screens }) => {
  const renderScreen = (screen) => (
    <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
  );

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {_.map(screens, (screen) => renderScreen(screen))}
    </Stack.Navigator>
  );
};

export default StackNav;
