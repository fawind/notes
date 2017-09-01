import { Dispatch, TypedAction } from 'redoodle';

const CLIENT_ID = '998747770178-tsvdpds9s2kam1u57u67ltuj383f7p3s.apps.googleusercontent.com';

export const SignedIn = TypedAction.define('SIGNED_IN')<{ idToken: string }>();
export const SignedOut = TypedAction.defineWithoutPayload('SIGNED_OUT')();

export const signIn = () => gapi.auth2.getAuthInstance().signIn();
export const signOut = () => gapi.auth2.getAuthInstance().signOut();

export const updateSignInStatus = (isSignedIn: boolean, dispatch: Dispatch) => {
  if (isSignedIn) {
    const idToken = gapi.auth2.getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    dispatch(SignedIn.create({ idToken }));
  } else {
    dispatch(SignedOut.create());
  }
};

export const initAuth = () => (dispatch: Dispatch) => {
  const initPromise = gapi.auth2.init({
    client_id: CLIENT_ID,
  });

  initPromise.then(() => {
    gapi.auth2.getAuthInstance()
      .isSignedIn
      .listen((newIsSignedIn: boolean) => updateSignInStatus(newIsSignedIn, dispatch));
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    updateSignInStatus(isSignedIn, dispatch);
  });
};
