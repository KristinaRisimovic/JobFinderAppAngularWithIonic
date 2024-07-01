import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";
import { AdminGuard } from './admin/admin.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    /* redirectTo: 'home',
    pathMatch: 'full' */
  },
 /*  {
    path: 'superheroes',
    loadChildren: () => import('./superheroes/superheroes.module').then( m => m.SuperheroesPageModule),
    canLoad: [AuthGuard]
  }, */
 /* {
    path: 'add-job',
    loadChildren: () => import('./add-job/add-job.module').then( m => m.AddJobPageModule)
  },*/
 /*  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesPageModule),
      canLoad: [AuthGuard]
  }, */
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
      //canLoad: [AuthGuard]
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule),
      //canLoad: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-or-register',
    loadChildren: () => import('./auth/login-or-register/login-or-register.module').then( m => m.LoginOrRegisterPageModule)
  },

  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then( m => m.JobsPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'add-job',
    loadChildren: () => import('./add-job/add-job.module').then( m => m.AddJobPageModule),
    canActivate: [AdminGuard]
  },
/*   {
    path: 'mysuperheroes',
    loadChildren: () => import('./mysuperheroes/mysuperheroes.module').then( m => m.MysuperheroesPageModule),
    canLoad: [AuthGuard]
  }, */



   { 
    path: 'my-profile',
    loadChildren: () => import('./myProfile/myProfile.module').then( m => m.MyProfilePageModule),
    //canActivate: [AuthGuard] 
  },
  {
    path: '**',
    redirectTo: 'login-or-register'
  } 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

 