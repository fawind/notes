import * as React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@src/store';
import App from '@src/containers/App';
import { initAuth } from '@src/store/actions/auth';

type Props = {};

const store = configureStore();

window.onload = () => gapi.load('auth2', () => store.dispatch(initAuth()));

export const AppProvider: React.SFC<Props> = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
