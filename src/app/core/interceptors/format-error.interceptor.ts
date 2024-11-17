import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpFormattedErrorResponse } from '../../../types/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Injectable()
export class FormatErrorInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastService: ToastService,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        const formattedError: HttpFormattedErrorResponse = {
          error: true,
          message: '',
          errors: [],
        };

        if (error.error instanceof ErrorEvent) {
          formattedError.message = 'Something went wrong. Please try again.';
        } else {
          if (error.status === 401 && this._authService.check()) {
            this.handleUnauthorized();
          }

          formattedError.status = error.status;
          formattedError.errors = error.error?.errors || [];
          formattedError.message = error.error?.message || error.error_message || error.message || 'Something went wrong. Please try again.';
        }

        return throwError(() => formattedError);
      }),
    );
  }

  handleUnauthorized() {
    this._authService.logout().subscribe(() => {
      this._toastService.error('Your session has expired. Please login again.');
      this._router.navigate(['/auth/login']);
    });
  }
}

export const formatErrorInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: FormatErrorInterceptor, multi: true }];
