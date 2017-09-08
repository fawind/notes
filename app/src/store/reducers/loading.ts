import { TypedReducer } from 'redoodle';

import * as Actions from '@src/store/actions/loading';

export type State = boolean;

function createReducer() {
  return TypedReducer.builder<State>()
    .withHandler(Actions.StartLoading.TYPE, () => {
      return true;
    })
    .withHandler(Actions.StopLoading.TYPE, () => {
      return false;
    })
    .build();
}

export const Reducer = createReducer();