import { setWith, TypedReducer } from 'redoodle';

import * as Actions from '@src/store/actions/notes';
import { INote } from '@src/model';
import { sortNotes } from '@src/utils';

export type State = INote[];

function createReducer() {
  const builder = TypedReducer.builder<State>();

  builder.withHandler(Actions.NotesLoaded.TYPE, (state, payload) => {
    return sortNotes(payload.notes);
  });

  builder.withHandler(Actions.NoteAdded.TYPE, (state, payload) => {
    return sortNotes([
      {
        id: payload.noteId,
        content: '',
        created: new Date(),
        modified: new Date(),
      },
      ...state,
    ]);
  });

  builder.withHandler(Actions.NoteDeleted.TYPE, (state, payload) => {
    return state.filter(note => note.id !== payload.noteId);
  });

  builder.withHandler(Actions.NoteSaved.TYPE, (state, payload) => {
    return sortNotes(state.map(note => {
      if (note.id !== payload.noteId) {
        return note;
      }
      return setWith(note, { content: payload.content, modified: new Date() });
    }));
  });

  return builder.build();
}

export const Reducer = createReducer();
