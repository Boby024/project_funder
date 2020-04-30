import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PageNotFoundResolver implements Resolve<any> {
  constructor(private activatedRoute: ActivatedRoute) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<any>|Promise<any>|any {
    const searchword = route.paramMap.get('query_username');
    console.log(this.activatedRoute.paramMap);
    console.log(searchword);

    return {key: 'profil_user', query_username: searchword};

    /*
    if (typeof searchword !== undefined) {
      return {key: 'profil_user', query_username: searchword};
    }
    console.log('unmatchedUrl');
    return {key: 'unmatchedUrl'}; */
    // return url;
    /*this.activatedRoute.paramMap.pipe(
      switchMap( params => {
        return params.get('query_username');
      })
    );*/
  }
}
