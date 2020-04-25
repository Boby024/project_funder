import {Component, Directive, OnInit} from '@angular/core';
import {ProjectAeService} from '../project-ae.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Categorie} from '../../../assets/models/categorie';
import {Project} from '../../../assets/models/project';
import {StartpageService} from '../../startpage/startpage.service';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {isEmpty} from 'rxjs/operators';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})

export class ProjectEditComponent implements OnInit {

  project = this.fb.group({
    // identifier: [''],
    identifier: ['', Validators.required],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', Validators.required],
    // status: [''],
    fundinglimit: ['', Validators.maxLength(14)], // Validators.pattern('^[0-9\\s.]{2,12}')
    creatorId: [''],
    predecessor: [''],
    categorieId: ['', Validators.required],
  });

  projectCreate = this.fb.group({
    title: ['', [Validators.maxLength(50), Validators.required]],
    description: ['', Validators.required],
    fundinglimit: ['', [Validators.maxLength(14), Validators.required]], // Validators.pattern('^[0-9\\s.]{2,12}')
    creatorId: [''],
    predecessor: [''],
    categorieId: ['', Validators.required],
  });

  categories: Categorie[];
  projects: Project[];
  inputChar: any;
  projectObject: Project;
  projectId: number;
  creatorId: number;
  updateProject: Project;
  createdProject: Project;

  constructor(private fb: FormBuilder,
              private projectAeService: ProjectAeService,
              private startpageService: StartpageService,
              private activatedRoute: ActivatedRoute,
              private authenticationUserService: AuthenticationUserService,
              private router: Router) {
    activatedRoute.url.subscribe( (url) => console.log(url) );
  }

  ngOnInit(): void {
    this.creatorId = this.authenticationUserService.getSessionStoragePassingData().id;
    console.log('user id: ' + this.creatorId);
    console.log('projectId: ' + this.projectId);

    this.getCategories();
    this.getProjects();

    this.activatedRoute.data.subscribe( (data: {updateProject: Project} | any) => {
      console.log(data);
      this.projectObject = data.updateProject;
      if (this.projectObject) {
        console.log(this.projectObject);
        this.projectId = this.projectObject.identifier;
        this.project.patchValue({
          identifier: this.projectObject.identifier,
          title: this.projectObject.title,
          fundinglimit: this.putOrRemovePoint(this.projectObject.fundinglimit),
          categorieId: this.projectObject.creatorId,
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
    const pattern = /[0-9\.]/;
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
    this.project.patchValue({
      creatorId: this.creatorId,
      fundinglimit: this.putOrRemovePoint(this.project.get('fundinglimit').value),
    });

    if (this.project.get('identifier').value !== undefined ) {
      console.log(this.project.value);
      this.projectAeService.updateProject(JSON.stringify(this.project.value))
        .subscribe( (response) => {
          console.log(response);
          this.updateProject = response;
          if (this.updateProject) {
            this.router.navigate(['/projectfunder/view_project/', this.projectId]);
          }else {
            document.getElementById('messageUpdate').innerHTML = 'Aktualieren Sie das Fenster and versuchen Sie nochmal';
          }
        });
    }
    document.getElementById('messageUpdate').innerHTML = 'Aktualieren Sie das Fenster and versuchen Sie nochmal';
  }

  submitOnCreate() {
    this.projectCreate.patchValue({
      creatorId: this.creatorId,
    });
    console.log(this.projectCreate.value);
    this.projectAeService.createProject(JSON.stringify(this.projectCreate.value))
      .subscribe( (response) => {
        console.log(response);
        this.createdProject = response;
        if (this.createdProject) {
        } else {
          document.getElementById('messageCreate').innerHTML = 'Aktualieren Sie das Fenster and versuchen Sie nochmal';
          // this.router.navigate(['/projectfunder']);
        }
      });
  }

  trackByIdentifier(index: number, project: any): string {
    return project.identifier;
  }
  putOrRemovePoint(price: any) {
    if (typeof price === 'number') {
      return price.toString().replace('.', ',');
    } else if (typeof price === 'string') {
      return +(price.replace(',', '.'));
    }
  }
}
