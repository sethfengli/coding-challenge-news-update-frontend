import { Channel, createNewChannelState } from '../models/channel.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as ChannelActions from './channel.actions';
import {parseString} from 'xml2js';
import { NewsItemStatus } from '../models/NewsItem';

/**
 * Intial News State
 */
export const initialState: Array<Channel> = [
  createNewChannelState('http://feeds.bbci.co.uk/news/rss.xml'),
  createNewChannelState('https://www.smh.com.au/rss/feed.xml')
];

/**
 * Channel Reducer
 */
const channelReducer = createReducer(
  initialState,
  on(ChannelActions.AddNewChannel, (state, {url}) => state.concat(createNewChannelState(url))),
  on(ChannelActions.DeleteNewsChannel, (state, {id}) => state.filter(x => x.id !== id)),  // change it from here
  on(ChannelActions.LoadChannelAsync, (state, {id}) => FindChannelByIDAndUpdateItToInvalid(state, id)),
  on(ChannelActions.LoadChannelAsyncCompletely, (state, {id, updateXML}) => UpdateChannelByXML(state, id, updateXML)),
  on(ChannelActions.LoadChannelAsyncFailed, (state, {error}) => state ),
);

function FindChannelByIDAndUpdateItToInvalid(channels: Array<Channel>, id: string) {
  const channel = JSON.parse(JSON.stringify(channels.find(x => x.id === id)));
  channel.valid = false;  // update the valid value firstly
  channel.lastPolling = new Date();
  return [...channels.filter(x => x.id !== id), channel];
}

const channelFields = ['copyright', 'title', 'description', 'generator', 'link', 'lastBuildDate', 'language'];
const imageFields = [ 'title', 'link', 'url'];

function UpdateChannelByXML(channels: Array<Channel>, id: string, updateXML: string): Channel[] {
  const toUpdateChannel = JSON.parse(JSON.stringify(channels.find(x => x.id === id)));
  if (updateXML) {
    toUpdateChannel.valid = true;
    parseString(updateXML, (err, result) => {
      const sourceChanel = getFirstValueFromArray(result.rss.channel);
      if (sourceChanel) {
        channelFields.forEach( field => { toUpdateChannel[field] = getFirstValueFromArray(sourceChanel[field]); } );
        const image = getFirstValueFromArray(sourceChanel.image);
        if (image) {
          imageFields.forEach( field => { toUpdateChannel.image[field] = getFirstValueFromArray(image[field]); } );
        }
        // find all the items not in the new item list, and set status to delete
        toUpdateChannel.item.filter( n => !sourceChanel.item.find( s => s.guid === n.guid))
          .forEach( x => {
            x.status = NewsItemStatus.DELETED;
            x.lastUpdated = new Date();
          });
        // Went through the new item list
        sourceChanel.item.forEach( news => {
          const existsItem = toUpdateChannel.item.find( x => x.guid === getFirstValueFromArray(news.guid));
          if (existsItem) {
            if (existsItem.description !== getFirstValueFromArray(news.description)
                || existsItem.title !== getFirstValueFromArray(news.title)
                || existsItem.pubDate !== getFirstValueFromArray(news.pubDate) ) {
              existsItem.status = NewsItemStatus.UPDATED;
              existsItem.lastUpdated = new Date();
            }
          } else {
            toUpdateChannel.item = [...toUpdateChannel.item, {
              guid: getFirstValueFromArray(news.guid)._,
              pubDate: getFirstValueFromArray(news.pubDate),
              title: getFirstValueFromArray(news.title),
              description: getFirstValueFromArray(news.description),
              link: getFirstValueFromArray(news.link),
              status: NewsItemStatus.NEWADDED,
              lastUpdated: new Date()
            }];
          }
        });
      }
    });
  }
  return [...channels.filter(x => x.id !== id), toUpdateChannel];
}

function getFirstValueFromArray(value: any): any {
  if (value && value.length === 1) {
    return value[0];
  }
  return null;
}

export function reducer(state: Array<Channel> | undefined, action: Action) {
  return channelReducer(state, action);
}
