import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import {CONFIG} from '../../../config';
import {User} from '../../../shared/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiPath = `${CONFIG.apiPath}/users`;

  constructor(private readonly http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getUser(userId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${userId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public addUser(body: User ): Observable<any> {
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public deleteUser(userId: number): Observable<any> {
    return this.http
      .delete(`${this.apiPath}/${userId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editUser(body: User): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
