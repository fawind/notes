import { TypedAction } from 'redoodle';

export const SearchChanged = TypedAction.define('SEARCH_CHANGED')<{
  term: string,
}>();
