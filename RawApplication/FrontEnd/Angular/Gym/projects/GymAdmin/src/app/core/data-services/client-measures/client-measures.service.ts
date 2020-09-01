import { Injectable } from '@angular/core';
import {CONFIG} from '../../../config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {timeout} from 'rxjs/operators';
import {ClientMeasures} from '../../../shared/models/clientMeasurements.model';

@Injectable({
  providedIn: 'root'
})
export class ClientMeasuresService {

  private apiPath = `${CONFIG.apiPath}/clientMeasures`;

  constructor(private readonly http: HttpClient) {}

  public getClientMeasures(): Observable<any> {
    return this.http
      .get(`${this.apiPath}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public getClientMeasure(userId: number): Observable<any> {
    return this.http
      .get(`${this.apiPath}/${userId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public addClientMeasure(body: ClientMeasures ): Observable<any> {
    return this.http
      .post(`${this.apiPath}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public deleteClientMeasure(clientId: number): Observable<any> {
    return this.http
      .delete(`${this.apiPath}/${clientId}`)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
  public editClient(body: ClientMeasures): Observable<any> {
    return this.http
      .put(`${this.apiPath}/${body.id}`, body)
      .pipe(timeout(CONFIG.timeoutRequest));
  }
}
