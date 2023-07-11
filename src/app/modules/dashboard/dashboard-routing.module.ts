import { DashboardIndexComponent } from './pages/dashboard-index/dashboard-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardIndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'tenets',
        pathMatch: 'full'
      },
      {
        path: 'tenets',
        loadChildren: () => import('src/app/modules/dashboard/modules/user-management/tenets.module').then(m => m.TenetsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('src/app/modules/dashboard/modules/categories/categories.module').then((m) => m.CategoriesModule)
      },
      {
        path: 'sub-categories',
        loadChildren: () => import('src/app/modules/dashboard/modules/sub-categories/sub-categories.module').then((m) => m.SubCategoriesModule)
      },
      {
        path: 'banner',
        loadChildren: () => import('src/app/modules/dashboard/modules/banner/banner.module').then( (m) => m.BannerModule )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
