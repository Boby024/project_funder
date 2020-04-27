import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';

const errorPageRoutes: Routes = [
  {
    path: 'projectfunder/page_not_found',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  declarations: [PageNotFoundComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(errorPageRoutes),
  ]
})
export class ErrorPageModule { }
