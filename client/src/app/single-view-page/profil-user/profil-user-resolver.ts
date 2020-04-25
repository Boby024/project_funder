import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {SingleViewService} from '../single-view.service';

@Injectable({ providedIn: 'root' })
export class ProfilUserResolver implements Resolve<any> {

  constructor(private singleViewService: SingleViewService,
              private router: Router,
              private authenticationUserService: AuthenticationUserService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<any>|Promise<any>|any {
    const username = route.paramMap.get('username');
    const creatorId = this.authenticationUserService.getSessionStoragePassingData().id;
    const usernameLogged = this.authenticationUserService.getSessionStoragePassingData().username;
    const url = state.url;
    console.log('Resolving for user_projects ID:' + creatorId);
    console.log(url);
    console.log(route.url);

    if (usernameLogged === username) {
      return this.singleViewService.userProjects( +(creatorId) ).pipe(
        map(projects => {
          if (projects) {
            console.log(projects);
            return projects;
          } else {
            console.log('user projects with this creator_id:' + creatorId + ' don*t exist');
            this.router.navigate(['/projectfunder']);
            return null;
          }
        }));
    }else {
      this.router.navigate(['/projectfunder']);
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
