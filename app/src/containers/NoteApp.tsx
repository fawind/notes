import * as React from 'react';
import * as SplitPane from 'react-split-pane';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { INote, NoteId } from '@src/model';
import { SideBar } from '@src/components/SideBar';
import { NoteEditor } from '@src/components/NoteEditor';
import { RootState } from '@src/store/reducers';
import * as NoteActions from '@src/store/actions/notesAsync';
import * as SearchActions from '@src/store/actions/search';
import { NoteSelected } from '@src/store/actions/notes';
import { getFilteredNotes, getSelectedNote } from '@src/store/selectors';

type Props = {
  notes: INote[],
  selectedNote: INote,
  addNote: () => Promise<void>,
  deleteNote: (noteId: NoteId) => Promise<void>,
  saveNote: (noteId: NoteId, content: string) => Promise<void>,
  selectNote: (noteId: NoteId) => any,
  searchChanged: (term: string) => any;
};

const NoteApp: React.SFC<Props> = (props: Props) => {
  if (!props.selectedNote) {
    return (
      <SplitPane split={'vertical'} minSize={100} defaultSize={200}>
        <SideBar
          notes={props.notes}
          selectNote={props.selectNote}
          selectedNoteId={null}
          addNote={props.addNote}
          deleteNote={props.deleteNote}
          searchChanged={props.searchChanged}
        />
        <div />
      </SplitPane>
    );
  }
  return (
    <SplitPane split={'vertical'} minSize={100} defaultSize={250}>
      <SideBar
        notes={props.notes}
        selectNote={props.selectNote}
        selectedNoteId={props.selectedNote.id}
        addNote={props.addNote}
        deleteNote={props.deleteNote}
        searchChanged={props.searchChanged}
      />
      <NoteEditor note={props.selectedNote} saveNote={props.saveNote} />
    </SplitPane>
  );
};

const mapStateToProps = (state: RootState) => ({
  notes: getFilteredNotes(state),
  selectedNote: getSelectedNote(state),
});

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    addNote: () => dispatch(NoteActions.addNote()),
    deleteNote: (noteId: NoteId) => dispatch(NoteActions.deleteNote(noteId)),
    saveNote: (noteId: NoteId, content: string) => dispatch(NoteActions.saveNote(noteId, content)),
    selectNote: (noteId: NoteId) => dispatch(NoteSelected.create({ noteId })),
    searchChanged: (term: string) => dispatch(SearchActions.SearchChanged.create({ term })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteApp);
