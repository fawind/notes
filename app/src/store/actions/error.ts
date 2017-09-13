import { TypedAction } from 'redoodle';

export const ShowError = TypedAction.define('SHOW_ERROR')<{
  message: string,
  error?: any,
}>();

export const HideError = TypedAction.defineWithoutPayload('HIDE_ERROR')();
