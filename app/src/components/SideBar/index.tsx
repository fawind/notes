import * as React from 'react';
import { INote, NoteId } from '@src/model';
import { SideBarItem } from '@src/components/SideBar/SideBarItem';

import './styles.css';
import { ActionBar } from '@src/components/SideBar/ActionBar';

type Props = {
  notes: INote[],
  selectedNoteId: NoteId | null,
  selectNote: (noteId: NoteId) => void,
  addNote: () => Promise<void>,
  deleteNote: (noteId: NoteId) => Promise<void>,
};

const isSelected = (noteId: NoteId, selectedId: NoteId | null) => {
  return noteId === selectedId;
};

export const SideBar: React.SFC<Props> = (props: Props) => {
  return (
    <div className={'sidebar'}>
      <ActionBar onCreate={props.addNote} />
      {props.notes.map(note => (
        <SideBarItem
          key={note.id}
          id={note.id}
          content={note.content}
          modified={note.modified}
          selected={isSelected(note.id, props.selectedNoteId)}
          onSelect={props.selectNote}
          onDelete={props.deleteNote}
        />
      ))}
    </div>
  );
};
