import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project, ProjectClass} from '../../../assets/models/project';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {SingleViewService} from '../single-view.service';
import {NumberProjectByCreaterId} from '../../../assets/models/numberProjectByCreaterId';
import {DataAuthService} from '../../auth/data-auth.service';
import {DetailByUsername} from '../../../assets/models/detailByUsername';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {

  projects: Project[];
  detailByUsername: DetailByUsername;
  supportedProjects: Project[];
  creatorId: number;
  creatorName: string;
  numberProjectByCreaterId: NumberProjectByCreaterId;
  constructor(private activatedRoute: ActivatedRoute,
              private authenticationUserService: AuthenticationUserService,
              private singleViewService: SingleViewService,
              private dataAuthService: DataAuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: {userProjectsResolver: Project[]} | {userProjectsResolver: DetailByUsername} |any) => {

      if (typeof data.userProjectsResolver.length !== 'undefined') {
        console.log(this.projects);
        this.projects = data.userProjectsResolver;
        this.creatorId = this.authenticationUserService.getSessionStoragePassingData().id;
        this.creatorName = this.authenticationUserService.getSessionStoragePassingData().username;
        this.userPanel(+(this.creatorId), this.creatorName);
      } else {
        this.detailByUsername = data.userProjectsResolver;
        console.log(this.detailByUsername);
        this.userPanel(this.detailByUsername.id, this.detailByUsername.username);

        this.singleViewService.userProjects(this.detailByUsername.id)
          .subscribe( (data2) => {
            console.log(data2);
            this.projects = data2;
          });
      }
    });
  }
  userPanel(creatorIdParams: number, creatorNameParams: string) {

    this.creatorId = creatorIdParams;
    this.creatorName = creatorNameParams;
    this.listDonationByProjectId(this.creatorId);
    this.numberSupportedProject(this.creatorId);

    /*if (this.projects.length > 0) {
      this.creatorId = this.projects[0].creatorId;
      this.creatorName = this.projects[0].user;
      this.listDonationByProjectId(this.creatorId);
      this.numberSupportedProject(this.creatorId);
    }else {
      this.creatorName = localStorage.getItem('searchedUsername');
      this.dataAuthService.getUserByUsername(this.creatorName)
        .subscribe( (data2) => {
          console.log(data2);
          const detailByUsername: DetailByUsername = data2;
          if (detailByUsername.id !== undefined ) {
            this.listDonationByProjectId(detailByUsername.id);
            this.numberSupportedProject(detailByUsername.id);
          }
        });
    }*/
  }

  trackByIdentifier(index: number, project: any): string {
    return project.identifier;
  }
  listDonationByProjectId(donatorId: number) {
    this.singleViewService.listSupportedProjectByDonator(donatorId).subscribe( (data) => {
      this.supportedProjects = data;
      console.log(data);
    });
  }
  numberSupportedProject(userId: number) {
    this.singleViewService.numberSupportedProject(userId).subscribe( (data) => {
      this.numberProjectByCreaterId = data;
      console.log(data);
    });
  }
}
