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
  const QUOTE_RE = /^>(?:\s)/;

  const getClass = (optionalClass?: string): string => {
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
      } else if (stream.sol() && stream.match(QUOTE_RE)) {
        return getClass();
      }
      stream.next();
      return;
    },
  };
};

export const getTimeSince = (date: Date): string => {
  const diff = Math.abs((new Date().getTime() - date.getTime()) / 1000);
  const dayDiff = Math.floor(diff / 86400);
  if (dayDiff === 0) {
    if (diff < 60) { return 'Just now'; }
    if (diff < 120) { return '1 minute ago'; }
    if (diff < 3600) { return `${Math.floor(diff / 60)} minutes ago`; }
    if (diff < 7200) { return '1 hour ago'; }
    if (diff < 86400) { return `${Math.floor(diff / 3600)} hours ago`; }
  }
  if (dayDiff === 1) { return 'Yesterday'; }
  if (dayDiff < 7) { return `${dayDiff} days ago`; }
  if (dayDiff < 31) { return `${Math.ceil(dayDiff / 7)} weeks ago`; }
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};
