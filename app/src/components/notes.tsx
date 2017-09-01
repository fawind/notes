import * as React from 'react';
import { INote } from '@src/model';

type Props = {
  notes: INote[],
};

export const Notes: React.SFC<Props> = (props: Props) => {
  return (
    <div>
      <div>{JSON.stringify(props.notes, null, 2)}</div>
    </div>
  );
};
