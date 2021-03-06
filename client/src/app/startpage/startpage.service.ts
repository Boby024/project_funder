import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Project} from '../../assets/models/project';
import {User} from '../../assets/models/user';

@Injectable({
  providedIn: 'root'
})
export class StartpageService {

  private url = 'http://localhost:8080/projectfunder';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project []> {
    return this.http.get<Project []>(this.url + '/projects')
      .pipe(
        retry(3),
        catchError(this.handleError('getProjects', []))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' -> failed', error);
      return of(result as T);
    };
  }
}
