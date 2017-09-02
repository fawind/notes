import * as React from 'react';
import { INote, NoteId } from '@src/model';
import { SideBarItem } from '@src/components/SideBar/SideBarItem';

import './styles.css';

type Props = {
  notes: INote[],
  selectNote: (noteId: NoteId) => void,
};

export const SideBar: React.SFC<Props> = (props: Props) => {
  return (
    <div className={'sidebar'}>
      {props.notes.map(note => (
        <SideBarItem
          key={note.id}
          id={note.id}
          content={note.content}
          modified={note.modified}
          selected={false}
          onSelect={props.selectNote}
        />
      ))}
    </div>
  );
};
