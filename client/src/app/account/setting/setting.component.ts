import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Account} from '../../../assets/models/account';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  account: Account;
  pic: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( (data: {accountDetail: Account} | any) => {
      console.log(data);
      this.account = data.accountDetail;
    });
  }
  bearbeiten() {
    document.getElementById('bearbeiten').style.display = 'block';
  }

}
