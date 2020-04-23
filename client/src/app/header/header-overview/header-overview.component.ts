import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginRegisterComponent} from '../../dialogbox/login-register/login-register.component';

export interface DialogDataLoginRegister {
  login: {};
  register: {};
}

@Component({
  selector: 'app-header-overview',
  templateUrl: './header-overview.component.html',
  styleUrls: ['./header-overview.component.css']
})
export class HeaderOverviewComponent implements OnInit {
  login: any;
  register: any;
  feedback: any;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginRegisterComponent, {
      width: '500px',
      data: {loginData: this.login, registerData: this.register}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.feedback = result;
    });
  }

  ngOnInit(): void {
  }

}
