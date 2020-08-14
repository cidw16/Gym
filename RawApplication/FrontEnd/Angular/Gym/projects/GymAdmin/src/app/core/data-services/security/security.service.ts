import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../config/index';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Credentials } from '../../../shared/models/credentials.model';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private apiPath = `${CONFIG.apiPath}`;
  private molinaPath = `${CONFIG.apiAuthPath}/JWT_Auth`;

  constructor(private readonly http: HttpClient) {}

  public login(credentials: Credentials): Observable<any> {
    return this.http
      .get(`${this.apiPath}/login`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }

  public logout(): Observable<any> {
    return this.http
      .post(`${this.apiPath}/logout`, {})
      .pipe(timeout(CONFIG.timeoutRequest));
  }

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiPath}/forgotPassword`, {
      emailAddress: email,
    });
  }
}
