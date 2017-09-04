import { createStore, loggingMiddleware, StoreEnhancer } from 'redoodle';
import { applyMiddleware, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { RootState, RootReducer } from './reducers';

export const initialState: RootState = {
  notes: [],
  selectedNote: { id: 'null' },
  account: { loggedIn: true, idToken: null },
  search: { term: '' },
};

export function configureStore(): Store<RootState> {
  return createStore(
    RootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        loggingMiddleware({ enableInProduction: false }),
      ),
    ) as StoreEnhancer,
  );
}
