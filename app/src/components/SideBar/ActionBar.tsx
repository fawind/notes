import * as React from 'react';
import { Edit, Trash } from 'react-feather';

type Props = {
  onCreate: () => Promise<void>,
};

export const handleFocus = (event: any) => {
  event.target.select();
};

export const ActionBar: React.SFC<Props> = (props: Props) => {

  const handleCreate = () => props.onCreate();

  return (
    <div className={'actionBar'}>
      <a className={'icon'} onClick={handleCreate}>
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
