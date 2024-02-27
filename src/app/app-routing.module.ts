import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./applications/modules/user/user.module').then(
        (m) => m.UserModule
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./applications/modules/post/post.module').then(
        (m) => m.PostModule
      ),
  },

  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
  },

  // { path: 'not-found', component: PageNotFoundComponent },

  { path: 'auth', component: AuthComponent },

  // { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  // { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
