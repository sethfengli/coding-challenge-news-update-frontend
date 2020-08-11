import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/channel.selectors';
import { Observable } from 'rxjs';
import { NewsItem, NewsItemStatus} from 'src/app/models/NewsItem';
import { selectNewsItems } from 'src/app/store/channel.selectors';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news$: Observable<Array<NewsItem>>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.news$ = this.store.select(selectNewsItems);
  }

  getNewsItemStatusName(value: NewsItemStatus): string {
    return NewsItemStatus[value]
          .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  getNewsItemStatusClass(value: NewsItemStatus): string {
    switch (value) {
      case NewsItemStatus.DELETED: {
        return 'text-danger';
      }
      case NewsItemStatus.NEWADDED: {
        return 'text-success';
      }
      default: {
        return 'text-info';
      }
    }
  }
}
