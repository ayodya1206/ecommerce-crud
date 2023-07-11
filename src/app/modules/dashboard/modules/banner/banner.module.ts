import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { DeleteComponent } from './component/delete/delete.component';
import { ViewComponent } from './pages/view/view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    BannerRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class BannerModule { }
