import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../assets/models/project';

@Component({
  selector: 'app-list-project-overview',
  templateUrl: './list-project-overview.component.html',
  styleUrls: ['./list-project-overview.component.css']
})
export class ListProjectOverviewComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }
}
