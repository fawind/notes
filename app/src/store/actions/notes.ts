import { NoteId } from '@src/model';
import { TypedAction } from 'redoodle';

export const AddNote = TypedAction.define('ADD_NOTE')<{
  noteId: NoteId;
}>();
export const DeleteNote = TypedAction.define('DELETE_NOTE')<{
  noteId: NoteId;
}>();
export const SaveNote = TypedAction.define('SAVE_NOTE')<{
  noteId: NoteId;
  content: string;
}>();
export const SelectNote = TypedAction.define('SELECT_NOTE')<{
  noteId: NoteId;
}>();
