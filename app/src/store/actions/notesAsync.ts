import { CompoundAction, Dispatch } from 'redoodle';

import * as Actions from './notes';
import { StartLoading, StopLoading } from '@src/store/actions/loading';
import { ShowError } from '@src/store/actions/error';
import { NotesServiceProvider } from '@src/service/notesService';
import { INote } from '@src/model';

export const loadNotes = () => async (dispatch: Dispatch) => {
  try {
    const notes: INote[] = await NotesServiceProvider.get().getNotes();
    dispatch(CompoundAction.create([
      Actions.NotesLoaded.create({notes}),
      StopLoading.create(),
    ]));
  } catch (e) {
    handleError(dispatch, 'Error loading notes. Please try again later.', e);
  }
};

export const addNote = () => async (dispatch: Dispatch) => {
  dispatch(StartLoading.create());
  try {
    const noteId = await NotesServiceProvider.get().createNote();
    dispatch(CompoundAction.create([
      StopLoading.create(),
      Actions.NoteAdded.create({noteId}),
      Actions.NoteSelected.create({noteId}),
    ]));
  } catch (e) {
    handleError(dispatch, 'Error creating a new note.', e);
  }
};

export const deleteNote = (noteId: string) => async (dispatch: Dispatch) => {
  dispatch(StartLoading.create());
  try {
    await NotesServiceProvider.get().deleteNote(noteId);
    dispatch(CompoundAction.create([
      StopLoading.create(),
      Actions.NoteDeleted.create({noteId}),
    ]));
  } catch (e) {
    handleError(dispatch, 'Error deleting note.', e);
  }
};

export const saveNote = (noteId: string, content: string) => async (dispatch: Dispatch) => {
  dispatch(StartLoading.create());
  try {
    await NotesServiceProvider.get().updateNote(noteId, content);
    dispatch(CompoundAction.create([
      StopLoading.create(),
      Actions.NoteSaved.create({ noteId, content }),
    ]));
  } catch (e) {
    handleError(dispatch, 'Error saving note.', e);
  }
};

const handleError = (dispatch: Dispatch, message: string, error: any) => {
  dispatch(CompoundAction.create([
    StopLoading.create(),
    ShowError.create({ message, error }),
  ]));
};
