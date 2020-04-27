import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {AccountService} from './account.service';

const registerRoutes: Routes = [
  {
    path: 'projectfunder/register',
    component: RegisterComponent,
  }
];

@NgModule({
  declarations: [RegisterComponent],
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(registerRoutes),
  ],
  providers: [AccountService]
})
export class AccountModule { }
