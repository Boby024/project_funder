import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Project} from '../../assets/models/project';
import {catchError} from 'rxjs/operators';
import {Donate} from '../../assets/models/donate';
import {Annotate} from '../../assets/models/annotate';
import {CommentCompletForm} from '../../assets/models/commentCompletForm';
import {NumberProjectByCreaterId} from '../../assets/models/numberProjectByCreaterId';
import {FeedbackDonate} from '../../assets/models/feedbackDonate';

@Injectable({
  providedIn: 'root'
})
export class SingleViewService {

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
        catchError( this.handleError('getProjectById', null) )
      );
  }
  getDonationAmount(id: number): Observable<Donate> {
    return this.http.get<Donate>(this.url + '/getDonationAmount/' + id)
      .pipe(
        catchError( this.handleError('getDonationAmount', null) )
      );
  }
  listDonationByProjectId(id: number): Observable<Donate []> {
    return this.http.get<Donate []>(this.url + '/listDonationByProjectId/' + id)
      .pipe(
        catchError( this.handleError('listDonationByProjectId', null) )
      );
  }
  commentsProjetcId(id: number): Observable<Annotate []> {
    return this.http.get<Annotate []>(this.url + '/commentsProjetcId/' + id)
      .pipe(
        catchError( this.handleError('commentsProjetcId', null) )
      );
  }
  createComment(data: any): Observable<CommentCompletForm> {
    return this.http.post<CommentCompletForm []>(this.url + '/createComment', data, this.httpOptions)
      .pipe(
        catchError( this.handleError('createComment', null) )
      );
  }
  listSupportedProjectByDonator(donatorId: number): Observable<Project[]> {
    return this.http.get<Project []>(this.url + '/listSupportedProjectByDonator/' + donatorId)
      .pipe(
        catchError( this.handleError('ListSupportedProjectByDonator', null) )
      );
  }

  userProjects(id: number): Observable<Project[]> {
    return this.http.get<Project []>(this.url + '/userProjects/' + id)
      .pipe(
        catchError(this.handleError('userProjects', null))
      );
  }
  userProjectsByUsername(username: string): Observable<Project[]> {
    return this.http.get<Project []>(this.url + '/userProjectsByUsername/' + username)
      .pipe(
        catchError(this.handleError('userProjects', null))
      );
  }

  numberSupportedProject(userId: number): Observable<NumberProjectByCreaterId> {
    return this.http.get<NumberProjectByCreaterId>(this.url + '/numberSupportedProject/' + userId)
      .pipe(
        catchError( this.handleError('numberSupportedProject', null) )
      );
  }
  donateMoney(data: any): Observable<FeedbackDonate> {
    return this.http.post<FeedbackDonate>(this.url + '/donateMoney', data, this.httpOptions)
      .pipe(
        catchError( this.handleError('donateMoney', null) )
      );
  }

  deleteProjectById(projectId: number): Observable<NumberProjectByCreaterId> {
    return this.http.get<NumberProjectByCreaterId>(this.url + '/deleteProjectById/' + projectId)
      .pipe(
        catchError( this.handleError('deleteProjectById', null) )
      );
  }
  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + ' -> failed', error);
      return of(result as T);
    };
  }
}
