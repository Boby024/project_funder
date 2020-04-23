
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpageOverviewComponent } from './startpage-overview/startpage-overview.component';
import {RouterModule, Routes} from '@angular/router';
import {StartpageService} from './startpage.service';
import {HttpClientModule} from '@angular/common/http';
import {HeaderModule} from '../header/header.module';
import { ListProjectOverviewComponent } from './list-project-overview/list-project-overview.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ProjectAeModule} from '../project-ae/project-ae.module';



const startRoutes: Routes = [
  {
    path: '',
    component: StartpageOverviewComponent,
  },
  { path: 'project/createProject',
    loadChildren: () => import('../project-ae/project-ae.module').then(mod => mod.ProjectAeModule)
  },
];


@NgModule({
  declarations: [StartpageOverviewComponent, ListProjectOverviewComponent],
  exports: [
    RouterModule,
    StartpageOverviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    HeaderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ProjectAeModule,
    RouterModule.forChild(startRoutes),
    MatButtonModule,
  ],
  providers: [StartpageService] // [StartpageService]
})
export class StartpageModule { }
