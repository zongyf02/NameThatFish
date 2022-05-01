import _ from 'lodash';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import style from './style';
import { View, Text, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View>{children}</View>
  </TouchableOpacity>;
};

const BottomTab = ({ screens }) => {
  const renderScreen = (screen) => (
    <Tab.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={style.iconContainer}>
            <screen.IconComponent
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
