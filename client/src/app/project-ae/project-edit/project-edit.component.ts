import { Component, OnInit } from '@angular/core';
import {ProjectAeService} from '../project-ae.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Categorie} from '../../../assets/models/categorie';
import {Project} from '../../../assets/models/project';
import {StartpageService} from '../../startpage/startpage.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  project = this.fb.group({
    // identifier: [''],
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', Validators.required],
    // status: [''],
    fundinglimit: ['', Validators.pattern('^[0-9]{2,10}$')],
    creatorid: [''],
    predecessor: [''],
    categorieid: ['', Validators.required],
  });

  categories: Categorie[];
  projects: Project[];
  inputChar: any;

  constructor(private fb: FormBuilder,
              private projectAeService: ProjectAeService,
              private startpageService: StartpageService,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe( (url) => console.log(url) );
    activatedRoute.data.subscribe( (url) => console.log(url) );
  }

  keyPress(event) {
    const pattern = /[0-9]/;
    this.inputChar = event.key || String.fromCharCode(event.which);
    if (event.keypress !== 8 && !pattern.test(this.inputChar)) {
      event.preventDefault();
    }
  }
  get fundinglimit() { return this.project.get('fundinglimit'); }

  ngOnInit(): void {
    this.getCategories();
    this.getProjects();
  }
  getCategories() {
    this.projectAeService.getCategories().subscribe( (response) => {
      this.categories = response;
      console.log(this.categories);
    });
  }
  getProjects() {
    this.startpageService.getProjects().subscribe( (response) => {
      this.projects = response;
      console.log(this.projects);
    });
  }
  submit() {
    // later I'll first get the logged user_id
    // now I'll put it manually
    const creatorid = 3;
    this.project.get('creatorid').setValue(creatorid);
    this.projectAeService.createProject(JSON.stringify(this.project.value))
      .subscribe( (response) => {
        console.log(response);
      });
  }
}
