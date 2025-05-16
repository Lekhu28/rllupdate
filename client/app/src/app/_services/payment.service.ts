import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
    })
  }
  private apiURL = `${environment.apiUrl}/payments`;

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(pay: any): Observable<any> {
    return this.httpClient.post(this.apiURL, pay)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/payments/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(payment: any): Observable<any> {
    return this.httpClient.patch(this.apiURL, payment)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(_id: string) {
    return this.httpClient.delete(this.apiURL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: _id
      },
    })
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
