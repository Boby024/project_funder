import { Injectable } from '@angular/core';
import {DataAuthService} from '../data-auth.service';
import {Loginstoreddata} from '../../../assets/models/loginstoreddata';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationUserService {
  user: Loginstoreddata;

  constructor(private dataAuthService: DataAuthService) {
  }
  getSessionStorage() {
    // const data = sessionStorage.getItem('userData');
    if (sessionStorage.getItem('userData') ) {
      return true;
    }
    return false;
  }
  getSessionStoragePassingData() {
    const data = JSON.parse(sessionStorage.getItem('userData'));
    return data;
  }
  setSessionStorage(sessionName: string, sessionValue) {
    /*if (sessionStorage.getItem(sessionName)) {
      sessionStorage.removeItem(sessionName);
      sessionStorage.setItem(sessionName, sessionValue );
    } */
    sessionStorage.setItem(sessionName, sessionValue );
  }
  login(data: any) {
    console.log(data);
    this.dataAuthService.login(data)
      .subscribe( (response) => {
        this.user = response;
        console.log(response);
        if (this.user.id) {
          // this.setCookie('userData', JSON.stringify(response), 5);
          this.setSessionStorage('userData', JSON.stringify(response));
          location.reload();
        }
      });
  }
  logOut() {
    // document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.removeItem('userData');
    location.reload();
  }

  register() {}

  public get currentUserStatus() {
    // return this.getCookie();
    return this.getSessionStorage();
  }

  /*
  getCookieForCheking(){
    const name = 'userData' + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';')
    for ( let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        // console.log(c.substring(name.length, c.length) ); //  with this form{"pssword":"","id":,"username":""}
        // console.log(decodedCookie); // with this form user= {"pssword":"","id":,"username":""}
        return JSON.stringify(c.substring(name.length, c.length));
      }
    }
    return null;
  }
  getCookie(){
    const name = 'userData' + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';')
    for ( let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        // console.log(c.substring(name.length, c.length) );  with this form{"pssword":"","id":,"username":""}
        // console.log(decodedCookie); with this form user= {"pssword":"","id":,"username":""}
        return true;
      }
    }
    return false;
  }

  setCookie(cookieName: string, cookieValue: any, expirationHours: number) {
    const day = new Date();
    day.setTime( day.getTime() + (expirationHours * 60 * 60 * 1000) );
    const expires = day.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
  }
   */
}
