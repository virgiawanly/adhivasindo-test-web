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
        path: 'courses',
        canActivate: [authGuard],
        loadChildren: () => import('./courses/courses.routes').then((m) => m.COURSES_ROUTES),
      },
      {
        path: 'tools',
        canActivate: [authGuard],
        loadChildren: () => import('./tools/tools.routes').then((m) => m.TOOLS_ROUTES),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];
