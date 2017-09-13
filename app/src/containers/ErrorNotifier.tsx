import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '@src/store/reducers';
import * as ErrorActions from '@src/store/actions/error';
import { ErrorNotification } from '@src/components/ErrorNotification';

type Props = {
  hasError: boolean,
  errorMessage: null | string,
  hideError: () => any,
};

const ErrorNotifier: React.SFC<Props> = (props: Props) => {
  if (!props.hasError) {
    return null;
  }
  return <ErrorNotification message={props.errorMessage} hideError={props.hideError} />;
};

const mapStateToProps = (state: RootState) => ({
  loggedIn: state.account.loggedIn,
  loading: state.loading,
  hasError: state.error.visible,
  errorMessage: state.error.message,
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  hideError: () => dispatch(ErrorActions.HideError.create()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotifier);
