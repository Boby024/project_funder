import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {SingleViewService} from '../single-view.service';
import {Donate} from '../../../assets/models/donate';

@Injectable({ providedIn: 'root' })
export class ProjectDetailResolver implements Resolve<any> {

  toSend: any;
  donate: Donate;

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
          /*console.log(typeof project.identifier);
          this.singleViewService.getDonationAmount(project.identifier).subscribe( (data) => {
            console.log(data);
            this.donate = data;
            console.log({ project, donate: this.donate} );
          });
          return { project, donate: this.donate}; */
          return project;
        } else {
          console.log('project with id:' + id + ' don*t exist');
          this.router.navigate(['/projectfunder']);
          return null;
        }
      }));
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
