import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {SingleViewService} from '../single-view.service';
import {DataAuthService} from '../../auth/data-auth.service';

@Injectable({ providedIn: 'root' })
export class ProfilUserResolver implements Resolve<any> {

  constructor(private singleViewService: SingleViewService,
              private router: Router,
              private authenticationUserService: AuthenticationUserService,
              private dataAuthService: DataAuthService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<any>|Promise<any>|any {
    const username = route.paramMap.get('username');
    const creatorId = this.authenticationUserService.getSessionStoragePassingData().id;
    const usernameLogged = this.authenticationUserService.getSessionStoragePassingData().username;
    const url = state.url;
    console.log('Resolving for user_projects ID:' + creatorId);
    console.log(url);
    console.log(route.url);
    console.log(username);

    if (usernameLogged === username) {
      return this.singleViewService.userProjects( +(creatorId) ).pipe(
        map(projects => {
          if (projects) {
            console.log(projects);
            return projects;
          } else {
            console.log('user projects with this creator_id:' + creatorId + ' don*t exist');
            this.router.navigate(['/projectfunder/page_not_found']);
            return null;
          }
        }));
    }else {
      console.log(username);
      return this.dataAuthService.getUserByUsername(username).pipe(
        map(detailByUsername => {
          console.log(detailByUsername);
          if (detailByUsername.username === username) {
            return detailByUsername;
            /*return this.singleViewService.userProjectsByUsername( detailByUsername.username ).pipe(
              map(projects => {
                const searchedUsername = username;
                localStorage.removeItem('searchedUsername');
                localStorage.setItem('searchedUsername', searchedUsername);
                return projects;
              })); */
          }else {
            this.router.navigate(['/projectfunder/page_not_found']);
          }
        }));
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
/*
return this.singleViewService.userProjectsByUsername(username).pipe(
  map(projects => {
    if (projects) {
      console.log(projects);
      if (projects.length > 0) {
        return projects;
      }else {
        const searchedUsername = username;
        localStorage.removeItem('searchedUsername');
        localStorage.setItem('searchedUsername', searchedUsername);
        return projects;
      }
    } else {
      console.log('user projects with this creator_username:' + username + ' don*t exist');
      this.router.navigate(['/projectfunder/page_not_found']);
      return null;
    }
  })); */
