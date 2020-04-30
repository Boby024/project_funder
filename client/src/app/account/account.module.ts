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
  ],
  providers: [AccountService]
})
export class AccountModule { }
