import 'react-native-gesture-handler';
import React from 'react';
import { UploadOrCamera, Home } from './src/containers';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './src/components/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

export default function App() {
  const routes = [
    { name: ' ', component: UploadOrCamera },
    { name: 'Home', component: Home },
  ];
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack screens={routes}></Stack>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
