import { EditComponent } from './pages/edit/edit.component';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenetsRoutingModule } from './tenets-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ViewComponent } from './pages/view/view.component';
import { AddComponent } from './pages/add/add.component';
import { EditConfirmComponent } from './componenets/edit-confirm/edit-confirm.component';
import { DeleteConfirmComponent } from './componenets/delete-confirm/delete-confirm.component';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    ViewComponent,
    AddComponent,
    EditConfirmComponent,
    DeleteConfirmComponent
  ],
  imports: [
    CommonModule,
    TenetsRoutingModule,
    SharedModule
  ]
})
export class TenetsModule { }
