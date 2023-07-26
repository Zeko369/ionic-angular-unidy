import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'oauth/callback',
    loadComponent: () =>
      import('./pages/oauth-callback/oauth-callback.page').then(
        (m) => m.OauthCallbackPage
      ),
  },
];
