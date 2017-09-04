import * as React from 'react';

import { GoogleSignInButton } from '@src/components/GoogleSignInButton';

import './styles.css';

type Props = {};

export const LandingPage: React.SFC<Props> = () => {
  return (
    <div className={'landing CodeMirror'}>
      <div className={'CodeMirror-code'}>
        <pre className={'CodeMirror-line'}>
          <span className={'cm-header cm-header-1'}>
            <span className={'cm-mod'}>#</span> Keep your notes simple
          </span>
        </pre>
        <pre className={'CodeMirror-line'}>
          Light, clean, and free. Write down your thoughts and keep them updated across devices.
        </pre>
        <pre className={'CodeMirror-line'}>
          Log in instantly and get started now!
        </pre>
        <pre className={'CodeMirror-line singInButton'}>
          <GoogleSignInButton loggedIn={false}/>
        </pre>
        <pre className={'CodeMirror-line'}>
          <a href={'https://github.com/fawind/notes'}>GitHub</a> |&nbsp;
          <a href={'mailto:notes@fabian.me'}>Contact</a> |&nbsp;
          <a href={'https://github.com/fawind/notes/issues/new'}>Help</a>
        </pre>
      </div>
    </div>
  );
};
