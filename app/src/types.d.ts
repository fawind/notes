interface System {
  import<T = any>(module: string): Promise<T>
}
declare let System: System;

declare module 'react-codemirror2';
declare module 'react-feather';
