import { TypedReducer } from 'redoodle';
import { NoteId } from '@src/model';

import * as Actions from '@src/store/actions/notes';

export type State = {
  readonly id: NoteId,
};

function createReducer() {
  return TypedReducer.builder<State>()
    .withHandler(Actions.NoteSelected.TYPE, (state, payload) => {
      return { id: payload.noteId };
    })
    .build();
}

export const Reducer = createReducer();
