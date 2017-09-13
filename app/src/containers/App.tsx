import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '@src/store/reducers';
import NoteApp from '@src/containers/NoteApp';
import SignInPage from '@src/containers/SignInPage';
import { LoadingBar } from '@src/components/LoadingBar';
import ErrorNotifier from '@src/containers/ErrorNotifier';

type Props = {
  loggedIn: boolean,
  loading: boolean,
};

const getAppOrSignIn = (loggedIn: boolean) => {
  if (loggedIn) {
    return <NoteApp />;
  }
  return <SignInPage />;
};

const getLoadingBar = (loading: boolean) => {
  if (loading) {
    return <LoadingBar />;
  }
  return null;
};

const App: React.SFC<Props> = (props: Props) => {
  return (
    <div>
      <ErrorNotifier />
      {getLoadingBar(props.loading)}
      {getAppOrSignIn(props.loggedIn)}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loggedIn: state.account.loggedIn,
  loading: state.loading,
  hasError: state.error.visible,
  errorMessage: state.error.message,
});

export default connect(mapStateToProps)(App);
