import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {SingleViewService} from '../single-view.service';

@Injectable({ providedIn: 'root' })
export class ProjectDetailResolver implements Resolve<any> {

  constructor(private singleViewService: SingleViewService,
              private router: Router) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<any>|Promise<any>|any {
    const url = state.url;
    console.log(url);
    console.log(route.url);

    if (route.paramMap.get('id') !== undefined ) {
      const id = route.paramMap.get('id');
      console.log('Resolving for project id:' + id);

      return this.singleViewService.getProjectById(id).pipe(
        map(project => {
          if (project) {
            console.log(project);
            return project;
          } else {
            console.log('project with id:' + id + ' don*t exist');
            this.router.navigate(['/projectfunder/page_not_found']);
            return null;
          }
        }));
    }else {
      this.router.navigate(['/projectfunder/page_not_found']);
    }
  }
}

/*
if (typeof (project.predecessor) === 'number') {
            this.singleViewService.getProjectById(project.predecessor).pipe(
              map(  predecessorProject => {
                console.log(predecessorProject);
                if (predecessorProject) {
                  this.toSend = { project, projectPredecessor: predecessorProject};
                  return this.toSend;
                }
                }));
          }
 */
