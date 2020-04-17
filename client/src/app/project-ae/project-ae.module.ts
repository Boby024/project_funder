import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {ProjectEditResolver} from './project-edit/project-edit-resolver';


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
    RouterModule.forChild(projectRoutes),
  ],
  providers: [ProjectEditResolver]
})
export class ProjectAeModule { }
