import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuardService} from './authentication/auth-guard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [AuthGuardService]
})
export class AuthModule { }
