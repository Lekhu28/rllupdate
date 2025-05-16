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

      
      console.error('An error occurred:', error.error);
    } else {
    
      
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
   
    
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
