import { TypedReducer } from 'redoodle';
import * as Actions from '@src/store/actions/search';

export type State = {
  readonly term: string,
};

function createReducer() {
  return TypedReducer.builder<State>()
    .withHandler(Actions.SearchChanged.TYPE, (state, payload) => {
      return { term: payload.term };
    })
    .build();
}

export const Reducer = createReducer();
