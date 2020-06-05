import {Component, OnInit, ViewChild} from '@angular/core';
import {Project} from '../../../assets/models/project';
import {StartpageService} from '../startpage.service';
import {Router} from '@angular/router';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {SwitchAuthComponent} from '../../dialogbox/switch-auth/switch-auth.component';
import {MatDialog} from '@angular/material/dialog';


export interface DialogDataStartpage {
  action: any;
}
@Component({
  selector: 'app-startpage-overview',
  templateUrl: './startpage-overview.component.html',
  styleUrls: ['./startpage-overview.component.css']
})
export class StartpageOverviewComponent implements OnInit {

  projects: Project[];
  isProjectsEmpty = false;
  searchWord: string;
  resultsLength = 0;

  constructor(private startpageService: StartpageService,
              private authenticationUserService: AuthenticationUserService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.showprojects();

    /*const objP = this.startpageService.getProjects();
    forkJoin({objP}).subscribe({
      next: value => console.log(value),
      complete: () => console.log('This is how it ends!'),
    }); */

  }

  showprojects() {
    this.startpageService.getProjects().subscribe( (data) => {
      this.projects = data;
      console.log(this.projects);
      if (this.projects.length > 0) {
        this.resultsLength = this.projects.length;
        this.isProjectsEmpty  = true;
      }
    });
  }
  /*showprojectsWithProgressbar() {
    const responseProjects = this.startpageService.getProjects();
    forkJoin({responseProjects}).subscribe({
      next: (value) => {this.dataProjects = value.responseProjects; this.projects = this.dataProjects; console.log(this.dataProjects); },
      complete: () => console.log('This is how it ends!'),
    });
  } */

  trackByIdentifier(index: number, project: any): string {
    return project.identifier;
  }

  onKey(value: string) {
    this.searchWord = value;
    console.log(this.searchWord);

    // check the actual list from the page
    if (this.searchWord !== undefined) {
      this.startpageService.getProjects().subscribe( (data) => {
        this.projects = data.filter((project => (project.title.toLowerCase()).indexOf(this.searchWord.toLowerCase()) > -1 ));
        if (this.projects.length > 0) {
          this.isProjectsEmpty  = true;
        }
      });
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
  goCreateProject() {
    if (this.authenticationUserService.currentUserStatus) {
      this.router.navigate(['/project/createProject']);
    }else {
      this.openDialogNotLogged('Um ein <strong>Projekt erstellen</strong>  zu können, müssen Sie eingeloggt werden');
    }
  }

}
