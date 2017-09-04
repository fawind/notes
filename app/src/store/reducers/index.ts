import { combineReducers } from 'redoodle';

import { State as NotesState, Reducer as notesReducer } from './notes';
import { State as SelectedNoteState, Reducer as selectedNoteReducer } from './selectedNote';
import { State as AccountState, Reducer as AccountReducer } from './account';
import { State as SearchState, Reducer as SearchReducer } from './search';

export type RootState = {
  readonly notes: NotesState,
  readonly selectedNote: SelectedNoteState,
  readonly account: AccountState,
  readonly search: SearchState,
};

export const RootReducer = combineReducers<RootState>({
  notes: notesReducer,
  selectedNote: selectedNoteReducer,
  account: AccountReducer,
  search: SearchReducer,
});
