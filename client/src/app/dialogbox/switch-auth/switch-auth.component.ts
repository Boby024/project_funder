import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDataHeader} from '../../header/header-overview/header-overview.component';
import {DialogDataComment} from '../../single-view-page/project-detail/project-detail.component';
import {DialogDataStartpage} from '../../startpage/startpage-overview/startpage-overview.component';
import {Router} from '@angular/router';
import {DialogDataAuth} from '../../auth/authentication/auth-guard.service';


@Component({
  selector: 'app-switch-auth',
  templateUrl: './switch-auth.component.html',
  styleUrls: ['./switch-auth.component.css']
})
export class SwitchAuthComponent implements OnInit {

  message: string;
  noteWords = ['konto'];

  constructor(
    public dialogRef: MatDialogRef<SwitchAuthComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataHeader | DialogDataComment | DialogDataStartpage | DialogDataAuth ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.action !== undefined) {
      this.message = this.data.action;
      if (this.message.indexOf('Konto') > -1) {
        document.getElementById('register').style.display = 'block';
      }else if ( this.message.indexOf('Für diese Seite') > -1) {
        document.getElementById('goHome').style.display = 'block';
      }else {
        document.getElementById('actionMessage').innerHTML = this.message;
      }
    }
  }

  goToProfil() {
    this.router.navigate(['/projectfunder/register']);
    this.onNoClick();
  }
  goToHomepage() {
    this.router.navigate(['/projectfunder']);
    this.onNoClick();
  }

}
