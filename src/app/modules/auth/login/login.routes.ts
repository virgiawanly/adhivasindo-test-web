import { Routes } from '@angular/router';
import { noAuthGuard } from '../../../core/guards/no-auth.guard';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
];
