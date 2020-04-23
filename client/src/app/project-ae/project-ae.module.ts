import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {ProjectEditResolver} from './project-edit/project-edit-resolver';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {ListProjectOverviewComponent} from '../startpage/list-project-overview/list-project-overview.component';


const projectRoutes: Routes = [
  {
    path: 'project/createProject',
    component: ProjectEditComponent,
    resolve: {newProject: ProjectEditResolver},
  },
  {
    path: 'project/updateProject/:id',
    component: ProjectEditComponent,
    resolve: {updateProject: ProjectEditResolver},
  }
];
@NgModule({
  declarations: [ProjectEditComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    RouterModule.forChild(projectRoutes),
    MatCardModule,
  ],
  providers: [ProjectEditResolver],
})
export class ProjectAeModule { }
