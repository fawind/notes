import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app';

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'production') {
  renderRoot((
    <App />
  ));
} else {
  // tslint:disable-next-line:no-var-requires
  const HotContainer = require('react-hot-loader').AppContainer;
  renderRoot((
    <HotContainer>
      <App />
    </HotContainer>
  ));

  if (module.hot) {
    module.hot.accept('./app', async () => {
      const NextApp = (await System.import('./app')).App;
      renderRoot((
        <HotContainer>
          <NextApp />
        </HotContainer>
      ));
    });
  }
}
