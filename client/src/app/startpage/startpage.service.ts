import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Project} from '../../assets/models/project';
import {User} from '../../assets/models/user';

@Injectable({
  providedIn: 'root'
})
export class StartpageService {

  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  handleError(eror: HttpErrorResponse, operation: string, result: any) {
    console.error(operation + ' -> failed');
    return of(result);
  }

  getProjects(): Observable<Project []> {
    return this.http.get<Project []>(this.url + '/projects')
      .pipe(
        catchError(err => {
          console.error('getProjects -> failed', err);
          return of([]);
        })
      );
  }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/getUser/' + id)
      .pipe(
        catchError(err => {
          console.error('getUser -> failed', err);
          return of(null);
        })
      );
  }
}
