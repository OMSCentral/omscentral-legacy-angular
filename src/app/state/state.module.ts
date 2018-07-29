import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {
  routerReducer,
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { appReducer, appMetaReducers } from './app.reducer';
import { CustomSerializer } from './shared/utils';
import * as fromCourses from './courses/reducers';
import * as fromReviews from './reviews/reducers';
import * as fromAuth from './auth/reducers';
import { CoursesEffects } from './courses/effects/courses';
import { ReviewsEffects } from './reviews/effects/reviews';
import { AuthEffects } from './auth/effects/auth';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducer, {
      metaReducers: appMetaReducers,
    }),
    StoreModule.forFeature('courses', fromCourses.reducers),
    StoreModule.forFeature('reviews', fromReviews.reducers),
    StoreModule.forFeature('auth', fromAuth.reducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    EffectsModule.forRoot([AppEffects]),
    EffectsModule.forFeature([CoursesEffects, ReviewsEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  declarations: [],
})
export class StateModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: StateModule
  ) {
    if (parentModule) {
      throw new Error(
        'StateModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer,
        },
      ],
    };
  }
}
