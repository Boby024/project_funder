import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../assets/models/project';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {SingleViewService} from '../single-view.service';
import {NumberProjectByCreaterId} from '../../../assets/models/numberProjectByCreaterId';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {

  projects: Project[];
  supportedProjects: Project[];
  creatorId: number;
  creatorName: string;
  numberProjectByCreaterId: NumberProjectByCreaterId;
  constructor(private activatedRoute: ActivatedRoute,
              private authenticationUserService: AuthenticationUserService,
              private singleViewService: SingleViewService) { }

  ngOnInit(): void {
    this.creatorId = this.authenticationUserService.getSessionStoragePassingData().id;
    this.creatorName = this.authenticationUserService.getSessionStoragePassingData().username;
    this.listDonationByProjectId(this.creatorId);
    this.numberSupportedProject(this.creatorId);

    this.activatedRoute.data.subscribe((data: {userProjectsResolver: Project} | any) => {
      this.projects = data.userProjectsResolver;
      console.log(this.projects);
    });
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
