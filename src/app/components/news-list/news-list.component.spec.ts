import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsListComponent } from './news-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NewsItem, NewsItemStatus} from 'src/app/models/NewsItem';
import { AppState, selectNewsItems } from 'src/app/store/channel.selectors';
import { Channel } from 'src/app/models/channel.model';
import { v4 as uuidv4 } from 'uuid';
import { MemoizedSelector } from '@ngrx/store';


describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let mockSelectNewsItems: MemoizedSelector<AppState, NewsItem[]>;
  let store: MockStore;
  const initialState: Array<Channel> = [{
                id: uuidv4(),
                url: 'A fake URL',
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
              }
  ];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ NewsListComponent ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    mockSelectNewsItems = store.overrideSelector(
      selectNewsItems,
      [
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
      ]
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render news card', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.new-item').textContent).toContain('You pay for privilege');
  });

  it('should getNewsItemStatusName by Enum NewsItemStatus name', () => {
    expect(component.getNewsItemStatusName(NewsItemStatus.DELETED)).toEqual('Deleted');
    expect(component.getNewsItemStatusName(NewsItemStatus.NEWADDED)).toEqual('Newadded');
  });

  it('should getNewsItemStatusClass by Enum NewsItemStatus name', () => {
    expect(component.getNewsItemStatusClass(NewsItemStatus.DELETED)).toEqual('text-danger');
    expect(component.getNewsItemStatusClass(NewsItemStatus.NEWADDED)).toEqual('text-success');
    expect(component.getNewsItemStatusClass(NewsItemStatus.UPDATED)).toEqual('text-info');
  });

});
