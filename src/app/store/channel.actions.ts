import { createAction, props } from '@ngrx/store';

export const AddNewChannel = createAction(
  '[Channel List] Add news channel',
  props<{ url: string }>()
);

export const DeleteNewsChannel = createAction(
  '[Channel List] Delete news channel',
  props<{ id: string }>()
);

export const LoadChannelAsync = createAction(
  '[Channel] Load Channel Async',
  props<{ id: string, url: string }>()
);

export const LoadChannelAsyncCompletely = createAction(
  '[Channel] Load Channel Async Completely',
  props<{ id: string, updateXML: string }>()
);

export const LoadChannelAsyncFailed = createAction(
  '[Channel] Load Channel Async Failed',
  props<{ error: string}>()
);





