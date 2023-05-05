import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'auth/login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
  { path: '**', loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404Module) },
  { path: 'error', loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404Module) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
