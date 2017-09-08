import { TypedAction } from 'redoodle';

export const StartLoading = TypedAction.defineWithoutPayload('START_LOADING')();
export const StopLoading = TypedAction.defineWithoutPayload('STOP_LOADING')();
