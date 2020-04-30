import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {Router} from '@angular/router';
import {SwitchAuthComponent} from '../../dialogbox/switch-auth/switch-auth.component';
import {MatDialog} from '@angular/material/dialog';

export interface DialogDataRegister {
  data: any;
  action: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    surname: ['', Validators.required],
    firstname: ['', Validators.required],
    pssword: ['', Validators.required],
    description: [''],
    idprofilimage: ['']
  });

  userImage = this.fb.group({
    id: [null],
    imageStringForm: ['', Validators.required],
    filesize: ['', Validators.required],
    lastmodified: ['', Validators.required],
    filetype: ['', Validators.required],
  });

  fileURL: any;
  idPic: number;
  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private authenticationUserService: AuthenticationUserService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  uploadImage(event) {
    /*
    const reader = new FileReader();

    const file = event.target.files[0];
    console.log(file);
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.userImage.patchValue({
        file: reader.result,
        fileSize: file.size
      });
    };
    */
    let file;
    const reader = new FileReader();
    file = event.target.files.item(0);
    console.log(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userImage.patchValue({
        lastmodified: file.lastModified,
        filetype: file.type,
        filesize: file.size,
        imageStringForm: reader.result,
      });
      console.log(this.userImage.value);
      if ( this.userImage.get('id').value === null ) {
        this.accountService.uploadProfilImage(JSON.stringify(this.userImage.value))
          .subscribe( (data) => {
            console.log(data);
            if (data.id !== null ) {
              this.fileURL = data.image;

              this.userImage.patchValue({
                id: data.id,
              });
              this.user.get('idprofilimage').setValue(data.id);
            }
          });
      }else {
        this.accountService.updateUploadProfilImage(JSON.stringify(this.userImage.value))
          .subscribe( (data) => {
            console.log(data);
            if (data.id !== null ) {
              this.fileURL = data.image;

              this.userImage.patchValue({
                id: data.id,
              });
              this.user.get('idprofilimage').setValue(data.id);
            }
          });
      }
    };
  }


  onSubmit() {
    console.log(this.user.value);
    if (this.user.value) {
      this.accountService.register(JSON.stringify(this.user.value))
        .subscribe( (data) => {
          console.log(data);
          if (data === null) {
            this.openDialogNotLogged('Keine Verbindung mit dem Server möglich');
          }
          if (data.id !== null) {
            this.authenticationUserService.setSessionStorage('userData', JSON.stringify(data));
            this.router.navigate(['/projectfunder/view_profil/', data.username]);
          }else {
            // dialog box saying the regeistration failed
            this.openDialogNotLogged('Ein Problem beim Server ist aufgetreten<strong>Registrierung</strong>. Warten Sie ein moment und versuchen Sie nochmal');
          }
        });
    }else {
      this.openDialogNotLogged('Formular nicht Komplett');
    }
  }

  openDialogNotLogged(action: string): void {
    const dialogRef = this.dialog.open(SwitchAuthComponent, {
      width: '500px',
      disableClose: true,
      data: {action}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
    });
  }
}
