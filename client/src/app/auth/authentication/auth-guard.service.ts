import { Injectable } from '@angular/core';
import {AuthenticationUserService} from './authentication-user.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SwitchAuthComponent} from '../../dialogbox/switch-auth/switch-auth.component';

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
    // this.router.navigate(['/projectfunder']);
    this.openDialog();
    // this.router.navigate(['/projectfunder']);
    setTimeout( () => {this.closeDialog(); return false; } , 2000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SwitchAuthComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
