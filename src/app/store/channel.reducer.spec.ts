import * as Reducer from './channel.reducer';
import * as Selector from './channel.selectors';
import * as Actions from './channel.actions';

describe('Chhanel Reducer Test', () => {

  const state: Selector.AppState = { channels: Reducer.initialState } ;

  it('LoadChannelAsyncFailed should return the default state', () => {
    const newState = Reducer.reducer(Reducer.initialState, Actions.LoadChannelAsyncFailed({error: 'error text'}));
    expect(newState).toBe(Reducer.initialState);
  });
  it('DeleteNewsChannel should return the default state - 1', () => {
    const id = state.channels[0].id;
    const newState = Reducer.reducer(Reducer.initialState, Actions.DeleteNewsChannel({id}));
    expect(newState.length).toBe(1);
  });
  it('AddNewChannel should return the default state + 1', () => {
    const url = 'Random URL String';
    const newState = Reducer.reducer(Reducer.initialState, Actions.AddNewChannel({url}));
    expect(newState.length).toBe(3);
  });
  it('LoadChannelAsync should return the default state which change channels to invalid', () => {
    const id = state.channels[0].id;
    const url = 'Random URL String';
    state.channels[0].valid = true;
    const newState = Reducer.reducer(Reducer.initialState, Actions.LoadChannelAsync({id, url}));
    expect(newState[0].valid).toBe(false);
  });
  it('LoadChannelAsyncCompletely should return the update state which change channels to by XML', () => {
    const id = state.channels[0].id;
    const updateXML = `
        <?xml version="1.0" encoding="UTF-8"?>
        <?xml-stylesheet title="XSL_formatting" type="text/xsl" href="/shared/bsp/xsl/rss/nolsol.xsl"?>
        <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://search.yahoo.com/mrss/">
            <channel>
                <title><![CDATA[BBC News - Home]]></title>
                <description><![CDATA[BBC News - Home]]></description>
                <link>https://www.bbc.co.uk/news/</link>
                <image>
                    <url>https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif</url>
                    <title>BBC News - Home</title>
                    <link>https://www.bbc.co.uk/news/</link>
                </image>
                <generator>RSS for Node</generator>
                <lastBuildDate>Mon, 03 Aug 2020 01:35:15 GMT</lastBuildDate>
                <copyright><![CDATA[Copyrigh reuse.]]></copyright>
                <language><![CDATA[en-gb]]></language>
                <ttl>15</ttl>
                <item>
                    <title><![CDATA[Coronavirus symptoms: What are they and how do I protect myself?]]></title>
                    <description><![CDATA[Loss of taste and smell have been added to the UK's list of coronavirus symptoms.]]></description>
                    <link>https://www.bbc.co.uk/news/health-51048366</link>
                    <guid isPermaLink="true">https://www.bbc.co.uk/news/health-51048366</guid>
                    <pubDate>Thu, 30 Jul 2020 09:04:32 GMT</pubDate>
                </item>
            </channel>
        </rss>
    `;

    const newState = Reducer.reducer(Reducer.initialState, Actions.LoadChannelAsyncCompletely({id, updateXML}));
    const testNewsGuid = 'https://www.bbc.co.uk/news/health-51048366';
    expect(newState.filter(x => x.id === id)[0].title).toEqual('BBC News - Home');
    expect(newState.filter(x => x.id === id)[0].image.title).toEqual('BBC News - Home');
    console.log(newState.filter(x => x.id === id)[0].item.filter(n => n.guid === testNewsGuid).title);
    const newsItem = newState.filter(x => x.id === id)[0].item.filter(n => n.guid === testNewsGuid)[0];
    expect(newsItem.title).toContain('Coronavirus symptoms');
  });
});
