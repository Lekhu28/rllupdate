import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {Prescription} from 'src/app/_models/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  id: string = "";
  private prescriptionUrl: string = "http://localhost:3000/prescription";

  constructor(private http: HttpClient) {
  }

  getprescription(id: string) {
    return this.http.get<Prescription>(this.prescriptionUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  getAllprescriptions() {
    return this.http.get<Prescription[]>(this.prescriptionUrl)
      .pipe(catchError(this.handleError));
  }

  addprescription(med: Prescription) {
    return this.http.post<Prescription>(this.prescriptionUrl, med)
      .pipe(catchError(this.handleError));
  }

  editprescription(med: Prescription) {
    return this.http.put<Prescription>(this.prescriptionUrl, med)
      .pipe(catchError(this.handleError));
  }

  deleteprescription(id: string) {
    return this.http.delete(this.prescriptionUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
