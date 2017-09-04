import { CompoundAction, Dispatch } from 'redoodle';

import * as Actions from './notes';
import { NotesServiceProvider } from '@src/service/notesService';
import { INote } from '@src/model';

export const loadNotes = () => async (dispatch: Dispatch) => {
  const notes: INote[] = await NotesServiceProvider.get().getNotes();
  dispatch(Actions.NotesLoaded.create({ notes }));
};

export const addNote = () => async (dispatch: Dispatch) => {
  const noteId = await NotesServiceProvider.get().createNote();
  dispatch(CompoundAction.create([
    Actions.NoteAdded.create({ noteId }),
    Actions.NoteSelected.create({ noteId }),
  ]));
};

export const deleteNote = (noteId: string) => async (dispatch: Dispatch) => {
  await NotesServiceProvider.get().deleteNote(noteId);
  dispatch(Actions.NoteDeleted.create({ noteId }));
};

export const saveNote = (noteId: string, content: string) => async (dispatch: Dispatch) => {
  await NotesServiceProvider.get().updateNote(noteId, content);
  dispatch(Actions.NoteSaved.create({ noteId, content }));
};
