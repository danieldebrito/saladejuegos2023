import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'sign-in', loadChildren: () => import('./auth/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'sign-up', loadChildren: () => import('./auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'verify-email', loadChildren: () => import('./auth/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule) },
  { path: 'games/ahorcado', loadChildren: () => import('./pages/games/ahorcado/ahorcado.module').then(m => m.AhorcadoModule) },
  { path: 'games/preguntados', loadChildren: () => import('./pages/games/preguntados/preguntados.module').then(m => m.PreguntadosModule) },
  { path: 'games/mayormenor', loadChildren: () => import('./pages/games/mayormenor/mayormenor.module').then(m => m.MayormenorModule) },
  { path: 'games/tragamonedas', loadChildren: () => import('./pages/games/tragamonedas/tragamonedas.module').then(m => m.TragamonedasModule) },
  { path: '**', loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404Module) },
  { path: 'error', loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404Module) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
