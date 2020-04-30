import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../../assets/models/user';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationUserService} from '../auth/authentication/authentication-user.service';
import {Profilimage} from '../../assets/models/profilimage';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient,
              private authenticationUserService: AuthenticationUserService) {
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' -> failed', error);
      return of(result as T);
    };
  }

  register(data: any): Observable<User> {
    return this.http.post<User>(this.url + '/user/create', data, this.httpOptions)
      .pipe(
        catchError(this.handleError('register', null))
      );
  }
  uploadProfilImage(data: any): Observable<Profilimage> {
    return this.http.post<Profilimage>(this.url + '/user/uploadProfilImage', data, this.httpOptions)
      .pipe(
        catchError(this.handleError('/uploadProfilImage', null))
      );
  }
  updateUploadProfilImage(data: any): Observable<Profilimage> {
    return this.http.put<Profilimage>(this.url + '/user/updateUploadProfilImage', data, this.httpOptions)
      .pipe(
        catchError(this.handleError('uploadProfilImage', null))
      );
  }
}
