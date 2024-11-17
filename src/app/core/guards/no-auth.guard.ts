import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.observe().pipe(
    map((authenticated) => {
      // If the user is authenticated...
      if (authenticated) {
        // Redirect to the root
        router.navigate(['/']);
      }
      // Prevent the access
      return !authenticated;
    }),
    catchError((e) => {
      // Redirect to the sign-in page
      router.navigate(['/']);
      // Prevent the access
      return of(false);
    }),
  );
};
