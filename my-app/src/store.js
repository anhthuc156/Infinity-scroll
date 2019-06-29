import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import RootReducer from './reducers/RootReducer';
import RootSagas from './sagas/RootSagas';

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(RootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(RootSagas);

export default store;