import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the logged user's token to be added to the headers
    const loggedUserToken = localStorage.getItem(environment.api_token_identifier);

    if (loggedUserToken && req.withCredentials) {
      const headers = req.headers.append('Authorization', `Bearer ${loggedUserToken}`);
      req = req.clone({ headers, withCredentials: false });
    } else {
      req = req.clone({ withCredentials: false });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
    );
  }
}

export const authInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
