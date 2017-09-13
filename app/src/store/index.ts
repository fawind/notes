import { createStore, loggingMiddleware, reduceCompoundActions, StoreEnhancer } from 'redoodle';
import { applyMiddleware, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { RootState, RootReducer, initialState } from './reducers';

export function configureStore(): Store<RootState> {
  return createStore(
    reduceCompoundActions(RootReducer),
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        loggingMiddleware({ enableInProduction: false }),
      ),
    ) as StoreEnhancer,
  );
}
