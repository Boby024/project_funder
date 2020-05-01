import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {AccountService} from './account.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import { SettingComponent } from './setting/setting.component';
import {AuthGuardService} from '../auth/authentication/auth-guard.service';
import {SettingResolver} from './setting/setting-resolver';
import {MatDividerModule} from '@angular/material/divider';
import { SettingUdpateOverviewComponent } from './setting-udpate-overview/setting-udpate-overview.component';

const registerRoutes: Routes = [
  {
    path: 'projectfunder/register',
    component: RegisterComponent,
  },
  {
    path: 'projectfunder/account/setting',
    canActivate: [AuthGuardService],
    component: SettingComponent,
    resolve: {accountDetail: SettingResolver}
  }
];

@NgModule({
  declarations: [RegisterComponent, SettingComponent, SettingUdpateOverviewComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    RouterModule.forChild(registerRoutes),
    MatDividerModule,
  ],
  providers: [AccountService, SettingResolver]
})
export class AccountModule { }
