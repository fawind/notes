import * as React from 'react';
import { signIn, signOut } from '@src/store/actions/auth';

import './styles.css';

type Props = {
  loggedIn: boolean;
};

export const GoogleSignInButton: React.SFC<Props> = (props: Props) => {
  if (!props.loggedIn) {
    return <button className="loginButton" onClick={signIn}>Sign in</button>;
  }
  return <button className="loginButton" onClick={signOut}>Sign out</button>;
};
