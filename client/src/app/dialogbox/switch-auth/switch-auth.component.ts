import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogDataLoginRegister} from '../../header/header-overview/header-overview.component';


@Component({
  selector: 'app-switch-auth',
  templateUrl: './switch-auth.component.html',
  styleUrls: ['./switch-auth.component.css']
})
export class SwitchAuthComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SwitchAuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataLoginRegister) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
