import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AuthenticationUserService} from '../../auth/authentication/authentication-user.service';
import {AccountService} from '../account.service';

@Injectable({ providedIn: 'root' })
export class SettingResolver implements Resolve<any> {

  creatorId: number;

  constructor(private accountService: AccountService,
              private authenticationUserService: AuthenticationUserService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<any>|Promise<any>|any {
    this.creatorId =  this.authenticationUserService.getSessionStoragePassingData().id;
    return this.accountService.getAccountById( +(this.creatorId) ).pipe(
      map(account => {
        if (account) {
          console.log(account);
          return account;
        } else {
          return null;
        }
      }));
  }
}
