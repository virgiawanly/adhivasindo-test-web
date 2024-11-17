import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/user-index/user-index.component').then((m) => m.UserIndexComponent),
  },
];
