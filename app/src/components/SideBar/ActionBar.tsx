import * as React from 'react';
import { Edit, Trash } from 'react-feather';

type Props = {
};

export const handleFocus = (event: any) => {
  event.target.select();
};

export const ActionBar: React.SFC<Props> = (props: Props) => {
  return (
    <div className={'actionBar'}>
      <a className={'icon'}>
        <Edit />
      </a>
      <input
        type={'search'}
        className={'searchBar'}
        placeholder={'Search Notes'}
        onFocus={handleFocus}
      />
    </div>
  );
};
