import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../../assets/models/user';
import {catchError} from 'rxjs/operators';

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

  login(data: any): Observable<User> {
    return this.http.post<User>(this.url + '/login', data, this.httpOptions)
      .pipe(
        catchError(err => {
          console.error('login -> failed', err);
          return of(null);
        })
      );
  }
}
