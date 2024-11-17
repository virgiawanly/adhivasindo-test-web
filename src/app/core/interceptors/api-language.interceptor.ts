import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiLanguageInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the logged user's token to be added to the headers
    const lang = localStorage.getItem('adhivisindoAdmin@lang') ?? 'en';

    const headers = req.headers.append('X-Localization', lang);
    req = req.clone({ headers, withCredentials: false });

    return next.handle(req);
  }
}

export const apiLanguageInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: ApiLanguageInterceptor, multi: true }];
