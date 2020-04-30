import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ErrorParams} from '../../../assets/models/errorParams';
import {hasOwnProperty} from 'tslint/lib/utils';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  searchname: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( (data: {errorParams: ErrorParams} | any) => {
      console.log(data);
      if (data.errorParams) {
        this.searchname = data.errorParams.query_username;
        console.log('searchname: ' + this.searchname);
      }else {
        document.getElementById('notMatchUrl').style.display = 'block';
      }
    });
  }
}
