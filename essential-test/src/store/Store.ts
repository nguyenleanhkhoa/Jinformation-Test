import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { State, Reducers } from '../reducers/RootReducer';
import { rootSaga } from '../sagas/RootSaga';

const sagaMiddleware = createSagaMiddleware();

const store : Store<State> = createStore(Reducers, applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(rootSaga);

