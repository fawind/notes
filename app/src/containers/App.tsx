import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as SplitPane from 'react-split-pane';

import { INote, NoteId } from '@src/model';
import { Notes } from '@src/components/notes';
import { LandingPage } from '@src/components/LandingPage';
import { RootState } from '@src/store/reducers';
import * as NoteActions from '@src/store/actions/notesAsync';
import { SideBar } from '@src/components/SideBar';

type Props = {
  notes: INote[],
  loggedIn: boolean,
  actions: ActionProps,
};

type ActionProps = {
  addNote: () => Promise<void>,
  deleteNote: (noteId: NoteId) => Promise<void>,
  saveNote: (noteId: NoteId, content: string) => Promise<void>,
};

const renderLogin = () => {
  return <LandingPage />;
};

const renderApp = (props: Props) => {
  const selectNote = (id: string) => console.log('Selected:', id);
  return (
    <SplitPane split={'vertical'} minSize={100} defaultSize={200}>
      <SideBar notes={props.notes} selectNote={selectNote}/>
      <Notes notes={props.notes} actions={props.actions}/>
    </SplitPane>
  );
};

const App: React.SFC<Props> = (props: Props) => {
  if (props.loggedIn) {
    console.log(props.actions);
    return renderApp(props);
  }
  return renderLogin();
};

const mapStateToProps = (state: RootState) => ({
  notes: state.notes,
  loggedIn: state.account.loggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  const actions = {
    addNote: () => dispatch(NoteActions.addNote()),
    deleteNote: (noteId: NoteId) => dispatch(NoteActions.deleteNote(noteId)),
    saveNote: (noteId: NoteId, content: string) => dispatch(NoteActions.saveNote(noteId, content)),
  };
  return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
