import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '@src/store/reducers';
import NoteApp from '@src/containers/NoteApp';
import SignInPage from '@src/containers/SignInPage';

type Props = {
  loggedIn: boolean,
};

const App: React.SFC<Props> = (props: Props) => {
  if (props.loggedIn) {
    return <NoteApp />;
  }
  return <SignInPage />;
};

const mapStateToProps = (state: RootState) => ({
  loggedIn: state.account.loggedIn,
});

export default connect(mapStateToProps)(App);
