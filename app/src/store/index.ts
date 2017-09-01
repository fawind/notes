import { createStore, loggingMiddleware, StoreEnhancer } from 'redoodle';
import { applyMiddleware, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer, { IRootState } from './reducers';

export const initialState: IRootState = {
  notes: [],
  selectedNote: { id: 'null' },
  account: { loggedIn: false, idToken: null },
};

export function configureStore(): Store<IRootState> {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        loggingMiddleware({ enableInProduction: false }),
      ),
    ) as StoreEnhancer,
  );
}
