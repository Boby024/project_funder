import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {SingleViewService} from '../single-view.service';

@Injectable({ providedIn: 'root' })
export class ProjectFundResolver implements Resolve<any> {

  constructor(private singleViewService: SingleViewService,
              private router: Router) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<any>|Promise<any>|any {
    const id = route.paramMap.get('id');
    const url = state.url;
    console.log('Resolving for project id:' + id);
    console.log(url);
    console.log(route.url);

    return this.singleViewService.getProjectById(id).pipe(
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
