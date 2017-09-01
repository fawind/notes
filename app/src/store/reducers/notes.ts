import { setWith, TypedReducer } from 'redoodle';

import * as Actions from '@src/store/actions/notes';
import { INote } from '@src/model';

export type State = INote[];

function createReducer() {
  const builder = TypedReducer.builder<State>();

  builder.withHandler(Actions.AddNote.TYPE, (state, payload) => {
    return [
      {
        id: payload.noteId,
        content: '',
        created: new Date(),
        modified: new Date(),
        selected: false,
      },
      ...state,
    ];
  });

  builder.withHandler(Actions.DeleteNote.TYPE, (state, payload) => {
    return state.filter(note => note.id !== payload.noteId);
  });

  builder.withHandler(Actions.SaveNote.TYPE, (state, payload) => {
    return state.map(note => {
      if (note.id !== payload.noteId) {
        return note;
      }
      return setWith(note, { content: payload.content, modified: new Date() });
    });
  });

  builder.withHandler(Actions.SelectNote.TYPE, (state, payload) => {
    return state.map(note => {
      if (note.id === payload.noteId) {
        return setWith(note, { selected: true });
      }
      return setWith(note, { selected: false });
    });
  });

  return builder.build();
}

export const Reducer = createReducer();
