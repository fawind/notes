import { createSelector } from 'reselect';
import { RootState } from '@src/store/reducers';
import { INote, NoteId } from '@src/model';

const getNotes = (state: RootState) => state.notes;
const getSelectedNoteId = (state: RootState) => state.selectedNote.id;

export const getSelectedNote = createSelector(
  [getNotes, getSelectedNoteId], (notes: INote[], selectedNote: NoteId) => {
    const noteIndex = notes.findIndex((note: INote) => note.id === selectedNote);
    if (noteIndex === -1) {
      return notes[0];
    }
    return notes[noteIndex];
  },
);
