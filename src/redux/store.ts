
import { createStore, compose, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer, RootStates} from './reducers'; // Adjust path as necessary
import rootSaga from './sagas'; // Adjust path as necessary
// import { DataActionTypes } from './actions';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

let store: Store;

export function configureStore(initialState: {} = {}) {
  console.log("inside configStore")
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const localStore: Store<RootStates>  = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  // Run sagas
  sagaMiddleware.run(rootSaga);

  store = localStore;

  return localStore;
}

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Exporting `AppDispatch` type
export type AppDispatch = typeof store.dispatch;

// Exporting the store instance for external usage
export function getStore() {
  return store;
}
