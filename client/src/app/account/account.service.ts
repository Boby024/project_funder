import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../../assets/models/user';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Profilimage} from '../../assets/models/profilimage';
import {Account} from '../../assets/models/account';

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

  constructor(private http: HttpClient) {
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
  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(this.url + '/getAccountById/' + id)
      .pipe(
        catchError(this.handleError('getAccountById', null))
      );
  }
  updateUserData(id: number, data: any): Observable<User> {
    return this.http.put<User>(this.url + '/updateUserData/' + id, data, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateUserData', null))
      );
  }
}
