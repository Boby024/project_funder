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
    console.log('Resolving for Project id:' + id);
    console.log(url);
    console.log(route.url);

    if (url === '/createProject') {
      return null;
    } else if (id !== undefined) {
      return this.projectAeService.getProjectById(id).pipe(
        map(faq => {
          if (faq) {
            return faq;
          } else {
            console.log('Project with id:' + id + ' don*t exist');
            this.router.navigate(['']);
            return null;
          }
        }));
    }
  }
}
