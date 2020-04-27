import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListProjectOverviewComponent} from './list-project-overview/list-project-overview.component';
import {RouterModule} from '@angular/router';
import { UserCommentComponent } from './user-comment/user-comment.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListProjectOverviewComponent, UserCommentComponent],
  exports: [ListProjectOverviewComponent, UserCommentComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class OverviewSingleModelModule { }
