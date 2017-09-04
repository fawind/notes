import { createSelector } from 'reselect';
import { RootState } from '@src/store/reducers';
import { INote, NoteId } from '@src/model';

const getNotes = (state: RootState) => state.notes;
const getSelectedNoteId = (state: RootState) => state.selectedNote.id;
const getSearchTerm = (state: RootState) => state.search.term;

const hasUpperCase = (term: string) => /[A-Z]/.test(term);

export const getSelectedNote = createSelector(
  [getNotes, getSelectedNoteId], (notes: INote[], selectedNote: NoteId): INote | null => {
    if (notes.length === 0) {
      return null;
    }
    const noteIndex = notes.findIndex((note: INote) => note.id === selectedNote);
    if (noteIndex === -1) {
      return notes[0];
    }
    return notes[noteIndex];
  },
);

export const getFilteredNotes = createSelector(
  [getNotes, getSearchTerm], (notes: INote[], searchTerm: string) => {
    if (!searchTerm || searchTerm.length === 0) {
      return notes;
    }
    const searchCaseSensitive = hasUpperCase(searchTerm);
    return notes.filter(note => {
      if (searchCaseSensitive) {
        return note.content.includes(searchTerm);
      }
      return note.content.toLowerCase().includes(searchTerm);
    });
  },
);
