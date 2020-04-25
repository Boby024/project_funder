
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpageOverviewComponent } from './startpage-overview/startpage-overview.component';
import {RouterModule, Routes} from '@angular/router';
import {StartpageService} from './startpage.service';
import {HttpClientModule} from '@angular/common/http';
import {HeaderModule} from '../header/header.module';
import { ListProjectOverviewComponent } from '../overview-single-model/list-project-overview/list-project-overview.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ProjectAeModule} from '../project-ae/project-ae.module';
import {SingleViewPageModule} from '../single-view-page/single-view-page.module';
import {OverviewSingleModelModule} from '../overview-single-model/overview-single-model.module';



const startRoutes: Routes = [
  {
    path: 'projectfunder',
    component: StartpageOverviewComponent,
  },
  { path: 'project/createProject',
    loadChildren: () => import('../project-ae/project-ae.module').then(mod => mod.ProjectAeModule),
  },
  { path: 'project/view_project',
    loadChildren: () => import('../single-view-page/single-view-page.module').then(mod => mod.SingleViewPageModule),
  },
];


@NgModule({
  declarations: [StartpageOverviewComponent],
  exports: [
    RouterModule,
    StartpageOverviewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    HeaderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ProjectAeModule,
    SingleViewPageModule,
    OverviewSingleModelModule,
    RouterModule.forChild(startRoutes),
  ],
  providers: [StartpageService] // [StartpageService]
})
export class StartpageModule { }
