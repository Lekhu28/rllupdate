import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from 'src/app/_models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public patientlist: Patient[] = [];
  public deletePatientID: any;
  public editePatientID: any;
  public detailsPatientID: any;
  private baseUrl: string = "http://localhost:3000/patient"

  constructor(public http: HttpClient) {

  }

  getpatients() {
    return this.http.get<Patient[]>(this.baseUrl);

  }

  getPatientByID(_id: any) {

    return this.http.get<Patient>(this.baseUrl + "/" + _id);

  }

  deletePatient(_id: any) {

    return this.http.delete(this.baseUrl + "/" + _id);
  }

  addPatient(st: Patient) {

    return this.http.post<Patient>(this.baseUrl, st)
  }

  updatePatient(pt: Patient) {
    return this.http.put(this.baseUrl, pt)
  }
}
