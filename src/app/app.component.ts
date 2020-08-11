import { Component , OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, interval, Subscription, throwError } from 'rxjs';

import { Channel, IdAndUrl } from './models/channel.model';
import { AppState, selectChannelIDAndUrl } from './store/channel.selectors';
import { AddNewChannel, LoadChannelAsync, DeleteNewsChannel } from './store/channel.actions';
import { FormGroup, FormControl, Validators, AbstractControl  } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Coding Challenge News Update Frontend';

  // Subscriptions and states
  channels$: Observable<Array<Channel>>;

  channelIdAndUrl$: Observable<Array<IdAndUrl>>;
  updateChannelsIdAndUrl: IdAndUrl[];

  schedulerSub$: Subscription;
  pollIntervalMinutes = 3;
  epoch = `System will poll news automatically every ${this.pollIntervalMinutes}
            minutes, or please click the button above to poll manually.`;

  // URL Form defined
  newChannelForm = new FormGroup({
    newChannelUrl: new FormControl('',  [
      Validators.required,
      Validators.minLength(10),
      this.urlValidators(),
    ]),
  });

  urlValidators() {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      if ( !!control.value && this.updateChannelsIdAndUrl.some(x => x.url === control.value) ) {
        return {urlValid: true };
      }
      return null;
    };
  }

  get f() { return this.newChannelForm.controls; }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.channels$ = this.store.select(store => store.channels);
    this.channelIdAndUrl$ = this.store.select(selectChannelIDAndUrl);
    // refresh news every pollIntervalMinutes
    this.schedulerSub$ = interval(1000 * 60 * this.pollIntervalMinutes).subscribe(val => this.updateChannel(val));
    this.updateChannelsIdAndUrl = this.getObeservableArray<IdAndUrl>(this.channelIdAndUrl$);
  }

  updateChannel(val: number) {
    this.epoch = `Polled ${val < 0 ? 'manually' : 'automatically ' + (val + 1) + ' time' + (val > 0 ? 's' : '')}.`;
    this.updateChannelsIdAndUrl.forEach( channel => {
      this.store.dispatch(LoadChannelAsync({id: channel.id, url: channel.url}));
    });
  }

  addChannel() {
    const url = this.newChannelForm.value.newChannelUrl;

    fetch(url)
    .then( res => res.text())
    .then( xml => {
      if (xml && xml.indexOf('channel') !== -1) {
        this.store.dispatch(AddNewChannel({url}));
        this.newChannelForm.reset();
        this.updateChannelsIdAndUrl = this.getObeservableArray<IdAndUrl>(this.channelIdAndUrl$);
      } else {
        alert('URL is invalid.');
      }
    }).catch( (err) => {
        alert('URL is invalid.' + err);
    });
  }

  delChannel(id: string) {
    this.store.dispatch(DeleteNewsChannel({id}));
    this.updateChannelsIdAndUrl = this.getObeservableArray<IdAndUrl>(this.channelIdAndUrl$);
  }

  private getObeservableArray<T>(ob$: Observable<Array<T>>): T[] {
    let values: T[] = [];
    ob$.subscribe(s => values = values.concat(...s)).unsubscribe();
    return values;
  }

  ngOnDestroy() {
    if (this.schedulerSub$) {
      this.schedulerSub$.unsubscribe();
    }
  }
}
