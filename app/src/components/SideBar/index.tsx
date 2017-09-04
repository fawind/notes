import * as React from 'react';
import * as FlipMove from 'react-flip-move';

import { INote, NoteId } from '@src/model';
import { SideBarItem } from '@src/components/SideBar/SideBarItem';
import { ActionBar } from '@src/components/SideBar/ActionBar';

import './styles.css';

type Props = {
  notes: INote[],
  selectedNoteId: NoteId | null,
  selectNote: (noteId: NoteId) => void,
  addNote: () => Promise<void>,
  deleteNote: (noteId: NoteId) => Promise<void>,
  searchChanged: (term: string) => void;
};

const isSelected = (noteId: NoteId, selectedId: NoteId | null) => {
  return noteId === selectedId;
};

export const SideBar: React.SFC<Props> = (props: Props) => {
  return (
    <div className={'sidebar'}>
      <ActionBar onCreate={props.addNote} onSearch={props.searchChanged} />
      <FlipMove>
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
      </FlipMove>
    </div>
  );
};
