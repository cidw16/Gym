import { Injectable } from '@angular/core';
import { ILogin } from './login';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginURL = 'http://localhost:3000/loginUser';

  constructor(private http: HttpClient) { }

  loginUser(): Observable<ILogin[]> {
    return this.http.get<ILogin[]>(this.loginURL).pipe (
      tap (data => console.log('All' + JSON.stringify(data))),
      catchError (this.handleError)
    );
  }

  // tslint:disable-next-line:typedef
  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
