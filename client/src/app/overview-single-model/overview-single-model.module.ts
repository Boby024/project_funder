import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListProjectOverviewComponent} from './list-project-overview/list-project-overview.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ListProjectOverviewComponent],
  exports: [ListProjectOverviewComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class OverviewSingleModelModule { }
