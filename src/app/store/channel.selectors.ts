import { createSelector } from '@ngrx/store';
import { Channel } from '../models/channel.model';

export interface AppState {
  channels: Array<Channel>;
}

export const selectChannel = (state: AppState) => state.channels;

export const selectChannelCount = createSelector(
  selectChannel,
  (channels: Array<Channel>) => channels.length
);

export const selectChannelIDAndUrl = createSelector(
  selectChannel,
  (channels: Array<Channel>) => channels.map(x => ({id: x.id, url: x.url}))
);

export const selectNewsItems = createSelector(
  selectChannel,
  (channels: Array<Channel>) =>
      channels.filter( x => x.valid)
              .map(x => x.item )
              .reduce( (flat, toFlatten) => flat.concat([...toFlatten]), [])
              .filter ( x => !!x.lastUpdated)
              .sort( (a, b) => ( b.lastUpdated.getTime() - a.lastUpdated.getTime())
              )
);


