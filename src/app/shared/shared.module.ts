import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule({
  declarations: [
    SafePipe
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule
  ],
  exports: [
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SafePipe,
    PerfectScrollbarModule
  ]
})
export class SharedModule { }
