import { combineReducers } from 'redoodle';

import { State as NotesState, Reducer as notesReducer } from './notes';
import { State as SelectedNoteState, Reducer as selectedNoteReducer } from './selectedNote';
import { State as AccountState, Reducer as AccountReducer } from './account';

export type IRootState = {
  readonly notes: NotesState,
  readonly selectedNote: SelectedNoteState,
  readonly account: AccountState,
};

export default combineReducers<IRootState>({
  notes: notesReducer,
  selectedNote: selectedNoteReducer,
  account: AccountReducer,
});
