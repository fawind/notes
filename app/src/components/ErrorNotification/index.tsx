import * as React from 'react';

import './styles.css';

type Props = {
  message: string | null,
  hideError: () => any,
};

export const ErrorNotification: React.SFC<Props> = (props: Props) => {
  return (
    <div className={'errorContainer'} onClick={props.hideError} >
      {props.message || 'Oops, something went wrong!'}
    </div>
  );
};
