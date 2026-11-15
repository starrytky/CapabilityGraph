import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full',
      },
      {
        path: 'todos',
        loadComponent: () =>
          import('./pages/todo-list/todo-list.page').then((m) => m.TodoListPage),
        title: '我的待办',
      },
      {
        path: 'todos/:id',
        loadComponent: () =>
          import('./pages/todo-detail/todo-detail.page').then((m) => m.TodoDetailPage),
        title: '待办详情',
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./pages/ionic-components/ionic-components.page').then(
            (m) => m.IonicComponentsPage,
          ),
        title: 'Ionic 组件',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tabs/todos',
  },
];
