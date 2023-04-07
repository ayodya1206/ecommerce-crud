import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren:() => import('src/app/modules/home/home.module').then( (m) => m.HomeModule )
  },
  {
    path:'login',
    loadChildren: () => import('src/app/modules/login/login.module').then( (m)=> m.LoginModule )
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
