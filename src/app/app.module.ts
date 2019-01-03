import * as Raven from 'raven-js';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material';

import { StateModule } from './state/state.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { AuthGuard } from './firebase/auth.guard';
import { AuthService } from './firebase/auth.service';

import { AngularGithubButtonsModule } from 'angular-github-buttons';

import '@webcomponents/custom-elements/custom-elements.min.js';

import { MarkdownModule } from 'ngx-markdown';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

Raven.config(
  'https://0e91a95e29e44c63b164865f792ec308@sentry.io/1216631'
).install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    CoreModule,
    AngularGithubButtonsModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    StateModule.forRoot(),
    FlexLayoutModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    environment.production
      ? { provide: ErrorHandler, useClass: RavenErrorHandler }
      : [],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
