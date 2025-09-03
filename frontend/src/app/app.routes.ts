import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'cards',
    children: [
      {
        path: 'form/new',
        loadComponent: () =>
          import('./features/cards/form/card-form.component').then(
            (m) => m.CardFormComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'form/edit/:userId',
        loadComponent: () =>
          import('./features/cards/form/card-form.component').then(
            (m) => m.CardFormComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: ':userId',
        loadComponent: () =>
          import('./features/cards/view/card-view.component').then(
            (m) => m.CardViewComponent
          ),
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
