import { Injectable } from '@angular/core';
import { createEffect, Actions,  ofType} from '@ngrx/effects';
import { map, catchError, flatMap } from 'rxjs/operators';
import { ChannelService } from '../services/channel.service';
import { LoadChannelAsync, LoadChannelAsyncCompletely, LoadChannelAsyncFailed } from './channel.actions';
import { of } from 'rxjs';

@Injectable()
export class ChannelEffects {

  constructor(
    private actions$: Actions,
    private channelService: ChannelService,
  ) { }

  loadChannel$ = createEffect(() => this.actions$.pipe(
    ofType(LoadChannelAsync),
    map( (action) => ([action.id, action.url]) ),
    flatMap( ([id, url]) => {
        return this.channelService.pollNews(url).pipe(
          map((xml) => LoadChannelAsyncCompletely( {id, updateXML: xml} )),
          catchError( error => {
            return of(LoadChannelAsyncFailed( {error}));
          })
        );
        })
    )
  );
}
