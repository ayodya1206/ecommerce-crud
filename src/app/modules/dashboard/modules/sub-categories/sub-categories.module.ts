import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { ViewComponent } from './pages/view/view.component';
import { DeleteComponent } from './components/delete/delete.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ViewComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    SubCategoriesRoutingModule,
    SharedModule,    
    NgxSpinnerModule
  ]
})
export class SubCategoriesModule { }
