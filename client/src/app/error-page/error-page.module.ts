import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundResolver} from './page-not-found/page-not-found-resolver';

import {FlexLayoutModule} from '@angular/flex-layout';

const errorPageRoutes: Routes = [
  {
    path: 'projectfunder/page_not_found',
    component: PageNotFoundComponent,
    resolve: {errorParams: PageNotFoundResolver}
  }
];

@NgModule({
  declarations: [PageNotFoundComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(errorPageRoutes),
  ],
  providers: [PageNotFoundResolver]
})
export class ErrorPageModule { }
