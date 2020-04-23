import {Component, Directive, OnInit} from '@angular/core';
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
    title: ['', [Validators.required, Validators.maxLength(50)]],
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
  projectObject: Project;
  projectId: number;
  tryVariable: any;

  constructor(private fb: FormBuilder,
              private projectAeService: ProjectAeService,
              private startpageService: StartpageService,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe( (url) => console.log(url) );
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProjects();

    this.activatedRoute.data.subscribe( (data: {updateProject: Project} | any) => {
      console.log(data);
      this.projectObject = data.updateProject;
      if (this.projectObject) {
        console.log(this.projectObject);
        this.project.patchValue({
          title: this.projectObject.title,
          fundinglimit: this.projectObject.fundinglimit,
          categorieid: this.projectObject.creatorId,
          description: this.projectObject.description,
        });
        document.getElementById('createProject').style.display = 'none';
        document.getElementById('editProject').style.display = 'block';
      } else {
        document.getElementById('createProject').style.display = 'block';
        document.getElementById('editProject').style.display = 'none';
      }
    });
  }

  keyPress(event) {
    const pattern = /[0-9]/;
    this.inputChar = event.key || String.fromCharCode(event.which);
    if (event.keypress !== 8 && !pattern.test(this.inputChar)) {
      event.preventDefault();
    }
  }
  get fundinglimit() { return this.project.get('fundinglimit'); }

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
    if (typeof this.projectId === 'number') {
      this.projectAeService.updateProject(this.projectId, JSON.stringify(this.project.value))
        .subscribe( (response) => {
          console.log(response);
        });
    } else {
      this.projectAeService.createProject(JSON.stringify(this.project.value))
        .subscribe( (response) => {
          console.log(response);
        });
    }
  }
}
