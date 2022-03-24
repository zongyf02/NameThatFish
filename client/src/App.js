import 'react-native-gesture-handler';
import React from 'react';
import { UploadOrCamera, Home } from './containers';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './components/navigation';

export default function App() {
  const routes = [
    { name: 'Upload / Camera', component: UploadOrCamera },
    { name: 'Home', component: Home },
  ];
  return (
    <NavigationContainer>
      <Stack screens={routes}></Stack>
    </NavigationContainer>
  );
}
