import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CategoriesModule } from './modules/dashboard/modules/categories/categories.module';
import { SubCategoriesModule } from './modules/dashboard/modules/sub-categories/sub-categories.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule,
    CategoriesModule,
    SubCategoriesModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    PerfectScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
