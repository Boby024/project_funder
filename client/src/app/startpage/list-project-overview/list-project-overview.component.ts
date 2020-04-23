import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../assets/models/project';
import {StartpageService} from '../startpage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-project-overview',
  templateUrl: './list-project-overview.component.html',
  styleUrls: ['./list-project-overview.component.css']
})
export class ListProjectOverviewComponent implements OnInit {

  @Input() project: Project;
  username: string;

  constructor(private startpageService: StartpageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // console.log(this.project);
  }
  getUser(id: string) {
    this.startpageService.getUser(id).subscribe( (data) => {
      console.log(data);
      this.username = data.username;
    });
  }
}

