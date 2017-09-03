import { INote } from '@src/model';

export const sortNotes = (notes: INote[]): INote[] => {
  if (notes.length <= 1) {
    return notes;
  }
  return notes.sort((noteA: INote, noteB: INote) => {
    return noteB.modified.getTime() - noteA.modified.getTime();
  });
};

export const markdownModifierOverlay = () => {
  const MODIFIER_CLASS = 'mod';
  const HEADING_RE = /(#{1,6})(?:\s)/;
  const LIST_RE = /^\s*(-\s\[(x|\s)]|\*|-|\+|\d+\.)\s/;

  const getClass = (optionalClass: string): string => {
    if (!optionalClass) {
      return MODIFIER_CLASS;
    }
    return `${MODIFIER_CLASS} ${MODIFIER_CLASS}-${optionalClass}`;
  };

  return {
    token: (stream: any): string | undefined => {
      if (stream.sol() && stream.match(HEADING_RE)) {
        return getClass('header');
      } else if (stream.sol() && stream.match(LIST_RE)) {
        return getClass('list');
      }
      stream.next();
      return;
    },
  };
};
