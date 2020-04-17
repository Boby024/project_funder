import { Component, OnInit } from '@angular/core';
import {ProjectAeService} from '../project-ae.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  constructor(private projectAeService: ProjectAeService,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe( (url) => console.log(url) );
    activatedRoute.data.subscribe( (url) => console.log(url) );
  }

  ngOnInit(): void {
  }

}
