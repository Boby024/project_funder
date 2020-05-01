import { Injectable } from '@angular/core';
import {AuthenticationUserService} from './authentication-user.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SwitchAuthComponent} from '../../dialogbox/switch-auth/switch-auth.component';

export interface DialogDataAuth {
  action: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authenticationUserService: AuthenticationUserService,
              private router: Router,
              public dialog: MatDialog) { }

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationUserService.currentUserStatus) {
      return true;
    }
    const url: string = state.url;
    console.log(url);
    this.openDialog('Für diese Seite brauchen Sie ein Account.');
    // this.router.navigate(['/projectfunder']);
    setTimeout( () => {
      this.openDialog('Für diese Seite brauchen Sie ein Account.');
      this.dialog.closeAll();
      this.router.navigate(['/projectfunder']);
      } , 8000);
  }

  openDialog(action: string): void {
    const dialogRef = this.dialog.open(SwitchAuthComponent, {
      width: '500px',
      data: {action},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
    });
  }
}
