import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginRegisterComponent} from '../../dialogbox/login-register/login-register.component';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {Router} from '@angular/router';

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
  username: string;

  constructor(public dialog: MatDialog,
              private authenticationUserService: AuthenticationUserService,
              private router: Router) { }

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
    if (this.authenticationUserService.currentUserStatus) {
      this.username = this.authenticationUserService.getSessionStoragePassingData().username;
    }
  }

  statusUser() {
    if (this.authenticationUserService.currentUserStatus) {
      return true;
    }else {
      return false;
    }
  }

  logOut(){
    this.authenticationUserService.logOut();
  }
  goToProfil() {
    if (this.authenticationUserService.currentUserStatus) {
      this.router.navigate(['/projectfunder/view_profil/', this.username]);
    }
  }
}
