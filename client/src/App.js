import 'react-native-gesture-handler';
import React from 'react';
import { UploadOrCamera, Home } from './containers';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './components/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

export default function App() {
  const routes = [
    { name: 'Upload / Camera', component: UploadOrCamera },
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
