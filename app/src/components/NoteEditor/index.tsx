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

type CodeMirror = {
  getValue: () => string,
  addOverlay: (overlay: any) => void,
  isClean: () => boolean;
  markClean: () => void,
};

export class NoteEditor extends React.Component<Props> {

  private saveTimeout = 5000;

  private editorOptions = {
    theme: 'paper',
    mode: { name: 'gfm', gitHubSpice: false },
    extraKeys: {
      'Enter': 'newlineAndIndentContinueMarkdownList',
      'Ctrl-S': this.saveEditor.bind(this),
    },
    lineWrapping: true,
  };

  private timeoutId: number;

  constructor(props: Props) {
    super(props);
    this.initializeEditor = this.initializeEditor.bind(this);
    this.saveEditor = this.saveEditor.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  initializeEditor(editor: CodeMirror, next: () => void) {
    editor.addOverlay(markdownModifierOverlay());
    next();
    this.autosaveEditor(editor);
  }

  autosaveEditor(editor: CodeMirror) {
    if (!editor.isClean()) {
      this.saveEditor(editor)
        .then(() => {
          this.timeoutId = setTimeout(this.autosaveEditor.bind(this, editor), this.saveTimeout);
        });
    } else {
      this.timeoutId = setTimeout(this.autosaveEditor.bind(this, editor), this.saveTimeout);
    }
  }

  saveEditor(editor: CodeMirror) {
    return this.props.saveNote(this.props.note.id, editor.getValue())
      .then(() => editor.markClean());
  }

  render() {
    return (
      <CodeMirror
        options={this.editorOptions}
        value={this.props.note.content}
        editorDidMount={this.initializeEditor}
      />
    );
  }
}
