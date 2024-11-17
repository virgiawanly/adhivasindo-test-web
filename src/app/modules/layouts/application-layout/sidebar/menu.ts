import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 0,
    label: 'Dashboard',
    icon: 'home',
    link: '/application/dashboard',
  },
  {
    id: 0,
    label: 'Courses',
    icon: 'book',
    link: '/application/courses',
  },
  {
    id: 0,
    label: 'Users',
    icon: 'users',
    link: '/application/users',
  },
  {
    id: 0,
    label: 'Master Data',
    icon: 'list',
    link: '#',
    subItems: [
      {
        id: 0,
        label: 'Tools/Categories',
        icon: 'hash',
        link: '/application/tools',
        parentId: 1,
      },
    ],
  },
  {
    id: 0,
    label: 'Logout',
    icon: 'log-out',
    link: '/application/logout',
  },
];
