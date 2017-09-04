import * as React from 'react';
import { X } from 'react-feather';

import { NoteId } from '@src/model';
import { getTimeSince } from '@src/utils';

const SPLIT_TOKEN = '\n';
const PLACEHOLDER_TITLE = 'New Note';
const PLACEHOLDER_BODY = 'Write something';

type Props = {
  id: NoteId,
  content: string,
  modified: Date,
  selected: boolean,
  onSelect: (noteId: NoteId) => void,
  onDelete: (noteId: NoteId) => Promise<void>,
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

export class SideBarItem extends React.PureComponent<Props> {

  constructor(props: Props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSelect() {
    this.props.onSelect(this.props.id);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    return (
      <div
        className={`item ${this.props.selected ? 'selected' : ''}`}
        onClick={this.handleSelect}
      >
        <div className={'title'}>
          {getNoteTitle(this.props.content)}
          {this.props.selected && <a className={'delete'} onClick={this.handleDelete} >
            <X />
          </a>}
        </div>
        <div className={'date'}>{getTimeSince(this.props.modified)}</div>
        <div className={'body'}>{getNoteBody(this.props.content)}</div>
      </div>
    );
  }
}
