import * as React from 'react';
import { NoteId } from '@src/model';
import { getTimeSince } from '@src/utils';

const SPLIT_TOKEN = '\n';
const PLACEHOLDER_TITLE = 'New Note';
const PLACEHOLDER_BODY = 'Write something';

type Props = {
  id: NoteId,
  content: string;
  modified: Date,
  selected: boolean,
  onSelect: (noteId: NoteId) => void;
};

const getNoteTitle = (content: string): string => {
  if (content.length === 0) {
    return PLACEHOLDER_TITLE;
  }
  return content.split(SPLIT_TOKEN)[0].replace('#', '').trim();
};

const getNoteBody = (content: string): string => {
  const parts = content.split(SPLIT_TOKEN);
  if (parts.length === 1) {
    return PLACEHOLDER_BODY;
  }
  return parts.slice(1).join(' ').substring(0, 100).trim();
};

export const SideBarItem: React.SFC<Props> = (props: Props) => {

  const handleClick = () => props.onSelect(props.id);

  return (
    <div
      className={`item ${props.selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <div className={'title'}>{getNoteTitle(props.content)}</div>
      <div className={'date'}>{getTimeSince(props.modified)}</div>
      <div className={'body'}>{getNoteBody(props.content)}</div>
    </div>
  );
};
