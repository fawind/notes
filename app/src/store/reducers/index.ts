import { combineReducers } from 'redoodle';

import { State as NotesState, Reducer as notesReducer } from './notes';
import { State as SelectedNoteState, Reducer as selectedNoteReducer } from './selectedNote';
import { State as AccountState, Reducer as AccountReducer } from './account';
import { State as SearchState, Reducer as SearchReducer } from './search';
import { State as LoadingState, Reducer as LoadingReducer } from './loading';
import { State as ErrorState, Reducer as ErrorReducer } from './error';

export type RootState = {
  readonly notes: NotesState,
  readonly selectedNote: SelectedNoteState,
  readonly account: AccountState,
  readonly search: SearchState,
  readonly loading: LoadingState,
  readonly error: ErrorState,
};

export const RootReducer = combineReducers<RootState>({
  notes: notesReducer,
  selectedNote: selectedNoteReducer,
  account: AccountReducer,
  search: SearchReducer,
  loading: LoadingReducer,
  error: ErrorReducer,
});

export const initialState: RootState = {
  notes: [],
  selectedNote: { id: 'null' },
  account: { loggedIn: true, idToken: null },
  search: { term: '' },
  loading: false,
  error: { visible: false, message: null },
};
