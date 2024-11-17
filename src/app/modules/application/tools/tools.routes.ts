import { Routes } from '@angular/router';

export const TOOLS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tool-index/tool-index.component').then((m) => m.ToolIndexComponent),
  },
];
