import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  private apiUrl = 'http://localhost:3000/api/receptionists';

  constructor(private http: HttpClient) {}

  getReceptionistById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  
}
