import { Routes } from '@angular/router';
import { noAuthGuard } from '../../core/guards/no-auth.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadChildren: () => import('./login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
