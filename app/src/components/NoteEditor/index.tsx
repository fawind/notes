import * as React from 'react';
import CodeMirror from 'react-codemirror2';

import 'codemirror/addon/edit/continuelist';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/keymap/vim';
import 'codemirror/lib/codemirror.css';

import { INote, NoteId } from '@src/model';
import { markdownModifierOverlay } from '@src/utils';
import './styles.css';

type Props = {
  note: INote,
  saveNote: (noteId: NoteId, content: string) => Promise<void>,
};

export const NoteEditor: React.SFC<Props> = (props: Props) => {

  const addOverlay = (editor: any, next: any) => {
    editor.addOverlay(markdownModifierOverlay());
    next();
  };

  const saveEditor = (codeMirror: { getValue: () => string }) => {
    props.saveNote(props.note.id, codeMirror.getValue());
  };

  const editorOptions = {
    theme: 'paper',
    mode: { name: 'gfm', gitHubSpice: false },
    extraKeys: {
      'Enter': 'newlineAndIndentContinueMarkdownList',
      'Ctrl-S': saveEditor,
    },
    lineWrapping: true,
  };

  return (
    <CodeMirror
      options={editorOptions}
      value={props.note.content}
      editorDidMount={addOverlay}
    />
  );
};