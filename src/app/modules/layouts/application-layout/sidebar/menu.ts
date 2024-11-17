import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 0,
    label: 'menu.dashboard',
    icon: 'home',
    link: '/application/dashboard',
  },
  {
    id: 1,
    label: 'menu.courses',
    icon: 'book',
    link: '/application/courses',
  },
  {
    id: 2,
    label: 'menu.student-users',
    icon: 'users',
    link: '/application/users',
  },
  {
    id: 3,
    label: 'menu.master-data',
    icon: 'list',
    link: '#',
    subItems: [
      {
        id: 3.1,
        label: 'menu.tools',
        icon: 'hash',
        link: '/application/tools',
        parentId: 3,
      },
    ],
  },
];
