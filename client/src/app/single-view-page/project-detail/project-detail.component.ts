import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SingleViewService} from '../single-view.service';
import {Project} from '../../../assets/models/project';
import {Donate} from '../../../assets/models/donate';
import {Annotate} from '../../../assets/models/annotate';
import {MatDialog} from '@angular/material/dialog';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {SwitchAuthComponent} from '../../dialogbox/switch-auth/switch-auth.component';


export interface DialogDataComment {
  data: any;
  action: string;
}
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  detailProject: Project;
  donate: Donate;
  projectPredecessor: Project;
  donates: Donate [];
  annotates: Annotate[];

  userId: any;
  projectId: any;
  hiddenComment: boolean;

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private singleViewService: SingleViewService,
              private activatedRoute: ActivatedRoute,
              private authenticationUserService: AuthenticationUserService,
              private router: Router) {
    activatedRoute.url.subscribe( (url) => console.log(url) );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( (data: {detailProject: Project} | any) => {
      this.detailProject = data.detailProject;
      console.log(this.detailProject);
      this.getDonationAmount(this.detailProject.identifier);
      // setTimeout( () => {this.getDonationAmount(this.detailProject.identifier); }, 500);
      this.projectPredecessor = null;
      if ( typeof (this.detailProject.predecessor) === 'number') {
        this.getPredecessor(this.detailProject.predecessor);
      }
      this.listDonationByProjectId(this.detailProject.identifier);
      this.commentsProjetcId(this.detailProject.identifier);
    });
  }

  getPredecessor(id: number) {
    this.singleViewService.getProjectById(id).subscribe( (data) => {
      console.log(data);
      this.projectPredecessor = data;
    });
  }

  getDonationAmount(id: number) {
    this.singleViewService.getDonationAmount(id).subscribe( (data) => {
      console.log(data);
      this.donate = data;
      console.log(this.donate);
    });
  }

  listDonationByProjectId(projectId: number) {
    this.singleViewService.listDonationByProjectId(projectId).subscribe( (data) => {
      console.log(data);
      this.donates = data;
    });
  }
  commentsProjetcId(projectId: number) {
    this.singleViewService.commentsProjetcId(projectId).subscribe( (data) => {
      console.log(data);
      this.annotates = data;
    });
  }

  trackById(index: number, donate: any): string {
    return donate.user;
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

  /*comment(): void {
    if (this.authenticationUserService.getSessionStorage()) {
      const userData = this.authenticationUserService.getSessionStoragePassingData();
      const dialogRef = this.dialog.open(CommentComponent, {
        width: '500px',
        data: {data: {project: this.detailProject.identifier, projectTitle: this.detailProject.title, userId: userData.id } }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        const feedback = result;
        this.commentsProjetcId(this.detailProject.identifier);
      });

    }else {
      this.openDialogNotLogged();
    }
  } */
  doComment() {
    if (this.authenticationUserService.getSessionStorage()) {
      this.userId = this.authenticationUserService.getSessionStoragePassingData().id;
      this.projectId = this.detailProject.identifier;
      document.getElementById('hideBtnMainComment').style.display = 'none';
      document.getElementById('doComment').style.display = 'block';
    }else {
      this.openDialogNotLogged('Um <strong>kommentieren</strong> zu können, müssen Sie eingeloggt werden');
    }
  }
  catchStatusComent(event) {
    this.hiddenComment = event;
    console.log(this.hiddenComment);
    if (this.hiddenComment) {
      this.commentsProjetcId(this.projectId);
      document.getElementById('doComment').style.display = 'none';
      document.getElementById('hideBtnMainComment').style.display = 'block';
    }else {
      document.getElementById('doComment').style.display = 'none';
      document.getElementById('hideBtnMainComment').style.display = 'block';
    }
  }

  goEdit() {
    if (this.authenticationUserService.currentUserStatus) {
      const creatorid = this.authenticationUserService.getSessionStoragePassingData().id;
      if (this.detailProject.creatorId === creatorid) {
        this.router.navigate(['/project/updateProject/', this.detailProject?.identifier, {project: this.detailProject?.identifier}]);
      }else {
        this.openDialogNotLogged('Für dieses Projekt haben Sie kein Recht zum Editieren');
      }
    }else {
      this.openDialogNotLogged('Um <strong>editieren</strong> zu können, müssen Sie eingeloggt werden');
    }
  }
  deleteProjectById() {
    if (this.authenticationUserService.currentUserStatus) {
      const creatorid = this.authenticationUserService.getSessionStoragePassingData().id;
      if (this.detailProject.creatorId === creatorid) {
        this.openDialogNotLogged('Wollen Sie wirklich das Project löschen');
      }else {
        this.openDialogNotLogged('Für dieses Projekt haben Sie kein Recht zum Editieren');
      }
    }else {
      this.openDialogNotLogged('Um <strong>löschen</strong> zu können, müssen Sie eingeloggt werden');
    }
  }
  donateFunction() {
    if (this.authenticationUserService.currentUserStatus) {
      this.router.navigate(['/projectfunder/project_fund/id/', this.detailProject?.identifier, {project: this.detailProject?.identifier}]);
    }else {
      this.openDialogNotLogged('Um <strong>spenden</strong> zu können, müssen Sie eingeloggt werden');
    }
  }
}
