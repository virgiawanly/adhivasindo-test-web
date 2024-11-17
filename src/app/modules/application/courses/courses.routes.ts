import { Routes } from '@angular/router';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/course-index/course-index.component').then((m) => m.CourseIndexComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/course-detail/course-detail.component').then((m) => m.CourseDetailComponent),
  },
];
