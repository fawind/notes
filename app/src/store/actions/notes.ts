import { INote, NoteId } from '@src/model';
import { TypedAction } from 'redoodle';

export const NotesLoaded = TypedAction.define('NOTES_LOADED')<{
  notes: INote[],
}>();
export const NoteAdded = TypedAction.define('NOTE_ADDED')<{
  noteId: NoteId;
}>();
export const NoteDeleted = TypedAction.define('NOTE_DELETED')<{
  noteId: NoteId;
}>();
export const NoteSaved = TypedAction.define('NOTE_SAVED')<{
  noteId: NoteId;
  content: string;
}>();
export const NoteSelected = TypedAction.define('NOTE_SELECTED')<{
  noteId: NoteId;
}>();
