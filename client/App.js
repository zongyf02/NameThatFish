import 'react-native-gesture-handler';
import React from 'react';
import { AppContainer } from './src/containers';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppContainer></AppContainer>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
