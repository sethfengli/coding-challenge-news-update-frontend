
export interface NewsItem {
  guid: string;
  pubDate: Date;
  title: string;
  description: string;
  link: string;
  status: NewsItemStatus;
  lastUpdated: Date;
}

export enum NewsItemStatus {
  NEWADDED = 0,
  UPDATED = 1,
  DELETED = 2
}
