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
import {OverviewSingleModelModule} from '../overview-single-model/overview-single-model.module';
import { ProjectFundComponent } from './project-fund/project-fund.component';
import {ProjectFundResolver} from './project-fund/project-fund-resolver';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

const singleViewtRoutes: Routes = [
  {
    path: 'projectfunder/view_profil/:username',
    component: ProfilUserComponent,
    // canActivate: [AuthGuardService],
    resolve: {userProjectsResolver: ProfilUserResolver},
  },
  {
    path: 'projectfunder/view_project/:id',
    component: ProjectDetailComponent,
    resolve: {detailProject: ProjectDetailResolver},
  },
  {
    path: 'projectfunder/project_fund/id/:id',
    component: ProjectFundComponent,
    canActivate: [AuthGuardService],
    resolve: {fundProject: ProjectFundResolver},
  },
];

@NgModule({
  declarations: [ProjectDetailComponent, ProfilUserComponent, ProjectFundComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatButtonModule,
    OverviewSingleModelModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterModule.forChild(singleViewtRoutes),
  ],
  providers: [ProjectDetailResolver]
})
export class SingleViewPageModule { }
