import { v4 as uuidv4 } from 'uuid';
import { ChannelImage } from './ChannelImage';
import { NewsItem } from './NewsItem';

export interface IdAndUrl {
  id: string;
  url: string;
}

export interface Channel {
  id: string;
  url: string;
  valid: boolean;
  selected: boolean;
  lastPolling: Date;
  title: string;
  description: string;
  link: string;
  image: ChannelImage;
  generator: string;
  lastBuildDate: Date;
  copyright: string;
  language: string;
  item: NewsItem[];
}

export function createNewChannelState(newUrl: string ): Channel {
  return  {
    id: uuidv4(),
    url: newUrl,
    valid: false,
    selected: true,
    lastPolling: new Date(),
    title: '',
    description: '',
    link: '',
    image: {
      url: '',
      title: '',
      link: ''
    },
    generator: '',
    lastBuildDate: null,
    copyright: '',
    language: '',
    item: []
  };
}
