import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:3000/api/appointments'; // change URL as needed

  constructor(private http: HttpClient) {}

  bookAppointment(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }
}
