import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../../assets/models/user';
import {catchError} from 'rxjs/operators';
import {DetailByUsername} from '../../assets/models/detailByUsername';
import {Loginstoreddata} from '../../assets/models/loginstoreddata';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {

  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  login(data: any): Observable<Loginstoreddata> {
    return this.http.post<Loginstoreddata>(this.url + '/login', data, this.httpOptions)
      .pipe(
        catchError(this.handleError('login', null))
      );
  }

  getUserByUsername(username: string): Observable<DetailByUsername> {
    return this.http.get<DetailByUsername>(this.url + '/getUserByUsername/' + username)
      .pipe(
        catchError(catchError( this.handleError('getUserByUsername', null) ))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' -> failed', error);
      return of(result as T);
    };
  }
}
