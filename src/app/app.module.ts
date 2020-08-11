import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './store/channel.reducer';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ChannelEffects } from './store/channel.effects';
import { AppComponent } from './app.component';
import { ChannelService} from './services/channel.service';
import { NewsListComponent } from './components/news-list/news-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      channels: reducer
    }),
    EffectsModule.forRoot([ChannelEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
