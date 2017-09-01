export type NoteId = string;

export interface INote {
  id: NoteId,
  content: string,
  modified: Date,
  created: Date,
  selected?: boolean,
}
