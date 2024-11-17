import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'application',
    loadChildren: () => import('./modules/application/application.routes').then((m) => m.APPLICATION_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'application',
  },
];
