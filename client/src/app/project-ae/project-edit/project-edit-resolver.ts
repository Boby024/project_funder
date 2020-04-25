import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {ProjectAeService} from '../project-ae.service';

@Injectable({ providedIn: 'root' })
export class ProjectEditResolver implements Resolve<any> {
  constructor(private projectAeService: ProjectAeService,
              private router: Router) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<any>|Promise<any>|any {
    const id = route.paramMap.get('id');
    const url = state.url;
    console.log('Resolving for project id:' + id);
    console.log(url);
    console.log(route.url);

    if (url === '/project/createProject') {
      return null;
    } else if (id !== undefined) {
      return this.projectAeService.getProjectById(id).pipe(
        map(project => {
          if (project) {
            console.log(project);
            return project;
          } else {
            console.log('project with id:' + id + ' don*t exist');
            this.router.navigate(['/projectfunder']);
            return null;
          }
        }));
    }
  }
}

/*
const id = route.paramMap.get('id');
    const url = state.url;
    console.log('Resolving for Project id:' + id);
    console.log(url);
    console.log(route.url);
    this.projectAeService.getProjectById(id).subscribe( (data) => {console.log(data); });

    if (url === '/project/createProject') {
      return null;
    } else if (id !== undefined && url === '/project/updateProject') {
      return this.projectAeService.getProjectById(id).pipe(
        map(project => {
          console.log(project);
          if (project) {
            return project;
          } else {
            console.log('Project with id:' + id + ' don*t exist');
            this.router.navigate(['/start']);
            return null;
          }
        }));
    }
  }
 */
