import { TypedReducer } from 'redoodle';

import * as Actions from '@src/store/actions/auth';
import { NotesServiceProvider } from '@src/service/notesService';

export type State = {
  readonly loggedIn: boolean,
  readonly idToken: string | null,
};

function createReducer() {
  return TypedReducer.builder<State>()
    .withHandler(Actions.SignedIn.TYPE, (state, payload) => {
      NotesServiceProvider.setAuthToken(payload.idToken);
      return { loggedIn: true, idToken: payload.idToken };
    })
    .withHandler(Actions.SignedOut.TYPE, () => {
      NotesServiceProvider.clearAuthToken();
      return { loggedIn: false, idToken: null };
    })
    .build();
}

export const Reducer = createReducer();
