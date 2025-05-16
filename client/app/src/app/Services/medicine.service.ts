import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {Medicine} from 'src/app/_models/medicine';


@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  id: string = "";
  private medicineUrl: string = "http://localhost:3000/medicine";

  constructor(private http: HttpClient) {
  }

  getMedicine(id: string) {
    return this.http.get<Medicine>(this.medicineUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  getAllMedicines() {
    return this.http.get<Medicine[]>(this.medicineUrl).pipe(catchError(this.handleError));
  }

  addMedicine(med: Medicine) {
    return this.http.post<Medicine>(this.medicineUrl, med)
      .pipe(catchError(this.handleError));
  }

 
  
  editMedicine(med: Medicine) {
    return this.http.put<Medicine>(this.medicineUrl, med)
      .pipe(catchError(this.handleError));
  }

  deleteMedicine(id: string) {
    return this.http.delete(this.medicineUrl + '/' + id)
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
