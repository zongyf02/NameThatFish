import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducers/reducers';
import createSagaMiddleware from 'redux-saga';

import AsyncStorage from '@react-native-async-storage/async-storage';
import rootSaga, { logger } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancers = [applyMiddleware(sagaMiddleware, logger)];

/* eslint-disable no-undef */
const composeEnhancers =
  (__DEV__ && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storeage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
