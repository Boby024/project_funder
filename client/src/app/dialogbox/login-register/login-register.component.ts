import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDataHeader} from '../../header/header-overview/header-overview.component';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {User} from '../../../assets/models/user';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  response: any;
  user: User;
  username: string;
  loginDetail = this.fb.group({
    username: ['', Validators.required],
    pssword: ['', Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<LoginRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataHeader,
    private fb: FormBuilder,
    private authenticationUserService: AuthenticationUserService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authenticationUserService.login(JSON.stringify(this.loginDetail.value));
    if (this.authenticationUserService.currentUserStatus) {
      this.authenticationUserService.loginFeedback.subscribe( (data) => {
        console.log(data);
        this.data.feedback = true;
      });
    }else {
      document.getElementById('loginMessage').style.display = 'block';
    }
  }

}
