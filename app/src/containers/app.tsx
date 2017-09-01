import * as React from 'react';
import { IRootState } from '@src/store/reducers';
import { connect } from 'react-redux';

import { INote } from '@src/model';
import { Notes } from '@src/components/notes';

type Props = {
  notes: INote[],
};

const App: React.SFC<Props> = (props: Props) => {
  return (
    <div>
      <h1>Hello World</h1>
      <Notes notes={props.notes}/>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  notes: state.notes,
});

export default connect(mapStateToProps)(App);
