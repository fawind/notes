import { TypedReducer } from 'redoodle';

import * as Actions from '@src/store/actions/error';

const ISSUES_URL = 'https://github.com/fawind/notes/issues/new';

export type State = {
  readonly visible: boolean,
  readonly message: string | null,
};

function logError(message: string, error?: any) {
  // tslint:disable-next-line:no-console
  console.error(`Error: "${message}". If the error persists, please open an issue: ${ISSUES_URL}`);
  if (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
}

function createReducer() {
  return TypedReducer.builder<State>()
    .withHandler(Actions.ShowError.TYPE, (state, payload) => {
      logError(payload.message, payload.error);
      return { visible: true, message: payload.message };
    })
    .withHandler(Actions.HideError.TYPE, () => {
      return { visible: false, message: null };
    })
    .build();
}

export const Reducer = createReducer();
