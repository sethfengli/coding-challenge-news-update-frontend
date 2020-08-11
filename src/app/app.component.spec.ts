import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore , MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { Channel, IdAndUrl} from 'src/app/models/channel.model';
import { NewsListComponent } from './components/news-list/news-list.component';
import { v4 as uuidv4 } from 'uuid';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { selectChannelIDAndUrl, AppState } from './store/channel.selectors';

describe('AppComponent', () => {

  let store: MockStore;
  let MockSelectChannelIDAndUrl: MemoizedSelector<AppState, IdAndUrl[] >;

  const initialState: Array<Channel> = [{
    id: uuidv4(),
    url: 'A fake URL',
    valid: true,
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
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NewsListComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(NewsListComponent, {
      set: {
          selector: 'app-news-lists',
          template: `<h6>App New List</h6>`
        }}).compileComponents();
    store = TestBed.inject(MockStore);

    MockSelectChannelIDAndUrl = store.overrideSelector(
      selectChannelIDAndUrl,
      []
    );


  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Coding Challenge News Update Frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Coding Challenge News Update Frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('RSS Feed Channels');
  });
});
