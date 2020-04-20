import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Project} from '../../assets/models/project';
import {Categorie} from '../../assets/models/categorie';

@Injectable({
  providedIn: 'root'
})
export class ProjectAeService {

  private url = 'http://localhost:8080/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(this.url + '/getProject/id' + '/' + id)
      .pipe(
        catchError(err => {
          console.error('getProjectById -> failed', err);
          return of(null);
        })
      );
  }

  createProject(data: any): Observable<Project> {
    return this.http.post<Project>(this.url + '/createProject', data, this.httpOptions)
      .pipe(
        catchError(err => {
          console.error('createProject -> failed', err);
          return of(null);
        })
      );
  }

  updateProject(id: string, data: any): Observable<Project> {
    return this.http.put<Project>(this.url + '/updateProject/' + id, data, this.httpOptions)
      .pipe(
        catchError(err => {
          console.error('updateProject -> failed', err);
          return of(null);
        })
      );
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie []>(this.url + '/categories')
      .pipe(
        catchError(err => {
          console.error('getCategories -> failed', err);
          return of([]);
        })
      );
  }

}
