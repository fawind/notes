import { CompoundAction, Dispatch } from 'redoodle';

import * as Actions from './notes';
import { StartLoading, StopLoading } from '@src/store/actions/loading';
import { NotesServiceProvider } from '@src/service/notesService';
import { INote } from '@src/model';

export const loadNotes = () => async (dispatch: Dispatch) => {
  const notes: INote[] = await NotesServiceProvider.get().getNotes();
  dispatch(CompoundAction.create([
    Actions.NotesLoaded.create({ notes }),
    StopLoading.create(),
  ]));
};

export const addNote = () => async (dispatch: Dispatch) => {
  dispatch(StartLoading.create());
  const noteId = await NotesServiceProvider.get().createNote();
  dispatch(CompoundAction.create([
    StopLoading.create(),
    Actions.NoteAdded.create({ noteId }),
    Actions.NoteSelected.create({ noteId }),
  ]));
};

export const deleteNote = (noteId: string) => async (dispatch: Dispatch) => {
  dispatch(StartLoading.create());
  await NotesServiceProvider.get().deleteNote(noteId);
  dispatch(CompoundAction.create([
    StopLoading.create(),
    Actions.NoteDeleted.create({ noteId }),
  ]));
};

export const saveNote = (noteId: string, content: string) => async (dispatch: Dispatch) => {
  dispatch(StartLoading.create());
  await NotesServiceProvider.get().updateNote(noteId, content);
  dispatch(CompoundAction.create([
    StopLoading.create(),
    Actions.NoteSaved.create({ noteId, content }),
  ]));
};
