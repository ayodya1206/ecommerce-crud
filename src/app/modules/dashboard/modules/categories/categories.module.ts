import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { ViewComponent } from './pages/view/view.component';
import { DeleteComponent } from './components/delete/delete.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ViewComponent,
    DeleteComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ],
  exports: [    
    AddComponent,
  ]
})
export class CategoriesModule { }
