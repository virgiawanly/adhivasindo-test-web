import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ApplicationLayoutComponent } from '../layouts/application-layout/application-layout.component';

export const APPLICATION_ROUTES: Routes = [
  {
    path: '',
    component: ApplicationLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];
