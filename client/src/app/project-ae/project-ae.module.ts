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


const projectRoutes: Routes = [
  {
    path: 'createProject',
    component: ProjectEditComponent,
    resolve: {createProject: ProjectEditResolver},
  },
  {
    path: 'updateProject',
    component: ProjectEditComponent,
    resolve: {createProject: ProjectEditResolver},
  }
];
@NgModule({
  declarations: [ProjectEditComponent],
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
  providers: [ProjectEditResolver]
})
export class ProjectAeModule { }
