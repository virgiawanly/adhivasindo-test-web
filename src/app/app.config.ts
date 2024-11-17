import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LucideAngularModule, icons } from 'lucide-angular';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { toastrConfig } from './config/toastr';
import { authInterceptorProviders } from './core/interceptors/auth.interceptor';
import { formatErrorInterceptorProviders } from './core/interceptors/format-error.interceptor';
import { rootReducer } from './store';
import { LayoutEffects } from './store/layout/layout.effects';
import { UserEffects } from './store/user/user.effects';
import { apiLanguageInterceptorProviders } from './core/interceptors/api-language.interceptor';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    provideStore(rootReducer),
    provideEffects(LayoutEffects, UserEffects),
    provideEnvironmentNgxMask(),
    provideToastr(toastrConfig),
    provideHttpClient(withFetch()),
    TranslateService,
    authInterceptorProviders,
    apiLanguageInterceptorProviders,
    formatErrorInterceptorProviders,
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      LucideAngularModule.pick(icons),
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ),
  ],
};
