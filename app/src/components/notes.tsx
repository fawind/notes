import * as React from 'react';
import { INote, NoteId } from '@src/model';

type ActionProps = {
  addNote: () => void,
  deleteNote: (noteId: NoteId) => void,
  saveNote: (noteId: NoteId, content: string) => void,
};

type Props = {
  notes: INote[],
  actions: ActionProps,
};

export const Notes: React.SFC<Props> = (props: Props) => {
  console.log(props);
  return (
    <div>
      <div>{JSON.stringify(props.notes, null, 2)}</div>
    </div>
  );
};
