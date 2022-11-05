import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore, Store, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from '@/redux/reducers';
import rootSaga from './sagas';

type TStore = Store<unknown, Action<any>> & { dispatch: unknown };

const configureStore = (): TStore => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, composeWithDevTools(middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
