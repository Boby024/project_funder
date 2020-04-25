import { Component, OnInit } from '@angular/core';
import {Project} from '../../../assets/models/project';
import {StartpageService} from '../startpage.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-startpage-overview',
  templateUrl: './startpage-overview.component.html',
  styleUrls: ['./startpage-overview.component.css']
})
export class StartpageOverviewComponent implements OnInit {

  projects: Project[];
  searchWord: string;

  constructor(private startpageService: StartpageService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.showprojects();
  }

  showprojects() {
    this.startpageService.getProjects().subscribe( (data) => {
      this.projects = data;
      console.log(this.projects);
    });
  }

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
      });
    }
  }

}
