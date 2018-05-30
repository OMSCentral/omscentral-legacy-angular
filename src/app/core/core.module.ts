import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { GithubButtonModule } from 'angular-github-buttons';
import {
  MatToolbarModule,
  MatButtonModule,
  MatRippleModule,
  MatSnackBarModule,
  MatCardModule,
  MatSidenavModule,
} from '@angular/material';
import { AlertService } from './alert.service';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { SettingsService } from './settings.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    GithubButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    MatSnackBarModule,
    MatCardModule,
    MatSidenavModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [NavComponent, SidebarComponent],
  declarations: [NavComponent, SidebarComponent, PageNotFoundComponent],
  providers: [AlertService, LocalStorageService, UserService, SettingsService],
})
export class CoreModule {}
