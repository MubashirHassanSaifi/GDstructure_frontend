/* eslint-disable import/prefer-default-export */
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
// eslint-disable-next-line no-unused-vars
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from 'src/store/reducers';
import { ENABLE_REDUX_LOGGER } from 'src/config';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['account', 'admin'],
  blacklist: ['socket']

};

const reducerPersist = persistReducer(persistConfig, rootReducer);
const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware];

  if (ENABLE_REDUX_LOGGER) {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(reducerPersist, preloadedState, composedEnhancers);
  const persistor = persistStore(store);

  return { store, persistor };
}
