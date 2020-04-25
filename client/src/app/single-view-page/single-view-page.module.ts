import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../auth/authentication/auth-guard.service';
import {ProjectDetailResolver} from './project-detail/project-detail-resolver';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import {ProfilUserResolver} from './profil-user/profil-user-resolver';
import {StartpageModule} from '../startpage/startpage.module';
import {OverviewSingleModelModule} from '../overview-single-model/overview-single-model.module';



const singleViewtRoutes: Routes = [
  {
    path: 'projectfunder/view_profil/:username',
    component: ProfilUserComponent,
    canActivate: [AuthGuardService],
    resolve: {userProjectsResolver: ProfilUserResolver},
  },
  {
    path: 'projectfunder/view_project/:id',
    component: ProjectDetailComponent,
    // canActivate: [AuthGuardService],
    resolve: {detailProject: ProjectDetailResolver},
  },
];

@NgModule({
  declarations: [ProjectDetailComponent, ProfilUserComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatButtonModule,
    OverviewSingleModelModule,
    RouterModule.forChild(singleViewtRoutes),
  ],
  providers: [ProjectDetailResolver]
})
export class SingleViewPageModule { }
