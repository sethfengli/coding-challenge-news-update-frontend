import * as Reducer from './channel.reducer';
import * as Selector from './channel.selectors';


describe('Channel Selectors test', () => {
  const state: Selector.AppState = { channels: Reducer.initialState } ;
  Reducer.initialState[0].valid = true;
  Reducer.initialState[0].item =  [
    {
      guid: 'p55j1c',
      pubDate: new Date(),
      title: 'You pay for privilege: Why Diane Keatons enviable life has come at some cost',
      description: 'She has dated three of then opens up  why she wishes she started therapy earlier.',
      link: 'https://www.smh.com.au/culture/celebrity/yo.html?ref=rss&utm_medium=rss&utm_source=rss_feed',
      status: 0,
      lastUpdated: new Date()
    },
    {
      guid: 'p55iuv',
      pubDate: new Date(),
      title: 'As we clinked glasses, I had no idea it was the my brother',
      description: 'I openemind. Giggling children running along the beach. Sharing birthdays, Christmases, secrets.',
      link: 'https://www.smh.com.was-the-last-time-i-d-see-my-brother-20200805-p55iuv.html?ref=rss&utm_medium=rss&utm_source=rss_feed',
      status: 0,
      lastUpdated: new Date()
    }
  ];
  it('should calc selectChannel', () => {
    expect(Selector.selectChannel(state)).toBe(Reducer.initialState);
  });
  it('should calc selectChannelIDAndUrl', () => {
    const results = Selector.selectChannelIDAndUrl(state);
    expect(results.length).toEqual(2);
  });
  it('should calc selectChannelCount', () => {
    const results = Selector.selectChannelCount(state);
    expect(results).toEqual(2);
  });
  it('should calc selectNewsItems', () => {
    const results = Selector.selectNewsItems(state);
    expect(results?.length).toEqual(2);
  });
});


