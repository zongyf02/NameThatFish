import _ from 'lodash';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import style from './style';
import { Entypo } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTab = ({ screens }) => {
  const renderScreen = (screen) => (
    <Tab.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={{
        tabBarLabel: screen.name,
        tabBarIcon: ({ focused }) => (
          <View style={style.iconContainer}>
            <Entypo
              name={screen.iconId}
              size={screen.iconSize}
              color={focused ? '#00a4e6' : '#748c94'}
            />
            <Text style={style.iconLabel}>{screen.name}</Text>
          </View>
        ),
      }}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: style.botTabBar,
      }}
    >
      {_.map(screens, (screen) => renderScreen(screen))}
    </Tab.Navigator>
  );
};

export default BottomTab;
