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

  getProjectById(id: any): Observable<Project> {
    return this.http.get<Project>(this.url + '/getProject/' + id)
      .pipe(
        catchError(this.handleError('getProjectById', null))
      );
  }

  createProject(data: any): Observable<Project> {
    return this.http.post<Project>(this.url + '/createProject', data, this.httpOptions)
      .pipe(
        catchError(this.handleError('createProject', null))
      );
  }

  updateProject(data: any): Observable<Project> {
    return this.http.put<Project>(this.url + '/updateProject', data, this.httpOptions)
      .pipe(
        catchError(this.handleError('updateProject', null))
      );
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie []>(this.url + '/categories')
      .pipe(
        catchError(this.handleError('getCategories', null))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' -> failed', error);
      return of(result as T);
    };
  }

}
