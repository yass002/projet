import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '',
    title: 'Personnes',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: [],
    roles: ['ROLE_ADMIN', 'ROLE_USER']
  },
  {
    path: '/app/personnes/candidat',
    title: 'Candidats',
    icon: 'icon-Student-Male',
    class: '',
    extralink: false,
    submenu: [],
    roles: ['ROLE_ADMIN', 'ROLE_USER']
  },
];
