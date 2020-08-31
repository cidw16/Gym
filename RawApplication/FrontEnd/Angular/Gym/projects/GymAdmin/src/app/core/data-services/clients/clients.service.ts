import { Injectable } from '@angular/core';
import {CONFIG} from '../../../config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {timeout} from 'rxjs/operators';
import {Client} from '../../../shared/models/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiPath = `${CONFIG.apiPath}/clients`;

  constructor(private readonly http: HttpClient) {}

  public getClients(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getClient(userId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${userId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public addClient(body: Client ): Observable<any> {
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public deleteClient(clientId: number): Observable<any> {
    return this.http
      .delete(`${this.apiPath}/${clientId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editClient(body: Client): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
