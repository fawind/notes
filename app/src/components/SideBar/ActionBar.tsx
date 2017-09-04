import * as React from 'react';
import { Edit, Trash } from 'react-feather';
import { ChangeEvent } from 'react';

type Props = {
  onCreate: () => Promise<void>,
  onSearch: (term: string) => void,
};

export const handleFocus = (event: any) => {
  event.target.select();
};

export const ActionBar: React.SFC<Props> = (props: Props) => {

  const handleCreate = () => props.onCreate();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value || '';
    props.onSearch(text);
  };

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
        onChange={handleSearchChange}
      />
    </div>
  );
};
