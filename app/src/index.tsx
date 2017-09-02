import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { AppProvider } from './appProvider';
import './main.css';

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById('rootApp'));
};

const renderDev = (Component: React.StatelessComponent<any>) => {
  renderRoot(
    <AppContainer>
      <Component />
    </AppContainer>,
  );
};

const init = () => {
  if (process.env.NODE_ENV === 'production') {
    renderRoot(<AppProvider />);
  } else {
    renderDev(AppProvider);
    if (module.hot) {
      module.hot.accept('./appProvider', () => renderDev(AppProvider));
    }
  }
};

init();
