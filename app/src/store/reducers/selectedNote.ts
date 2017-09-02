import { TypedReducer } from 'redoodle';
import { NoteId } from '@src/model';

import * as Actions from '@src/store/actions/notes';
import { sortNotes } from '@src/utils';

export type State = {
  readonly id: NoteId | null,
};

function createReducer() {
  return TypedReducer.builder<State>()
    .withHandler(Actions.NotesLoaded.TYPE, (state, payload) => {
      if (payload.notes.length === 0) {
        return { id: null };
      }
      return { id: sortNotes(payload.notes)[0].id };
    })
    .withHandler(Actions.NoteSelected.TYPE, (state, payload) => {
      return { id: payload.noteId };
    })
    .build();
}

export const Reducer = createReducer();
