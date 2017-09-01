import { TypedReducer } from 'redoodle';
import * as Actions from '@src/store/actions/auth';

export type State = {
  readonly loggedIn: boolean,
  readonly idToken: string | null,
};

function createReducer() {
  return TypedReducer.builder<State>()
    .withHandler(Actions.SignedIn.TYPE, (state, payload) => {
      return { loggedIn: true, idToken: payload.idToken };
    })
    .withHandler(Actions.SignedOut.TYPE, () => {
      return { loggedIn: false, idToken: null };
    })
    .build();
}

export const Reducer = createReducer();
