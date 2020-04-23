import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterComponent } from './login-register/login-register.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogboxService} from './dialogbox.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';





@NgModule({
  declarations: [LoginRegisterComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DialogboxService]
})
export class DialogboxModule { }
