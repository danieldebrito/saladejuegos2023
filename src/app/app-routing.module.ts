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
  { path: 'sign-in', loadChildren: () => import('./auth/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'sign-up', loadChildren: () => import('./auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'verify-email', loadChildren: () => import('./auth/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: '**', loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404Module) },
  { path: 'error', loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404Module) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
