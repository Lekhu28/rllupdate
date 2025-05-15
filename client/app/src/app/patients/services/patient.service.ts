import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Patient} from './../models/patient';
import {Prescription} from '../models/prescription';
import {Appointment} from '../models/appointment';

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
    console.log(st);
    return this.http.post<Patient>(this.baseUrl, st)
  }

  updatePatient(pt: Patient) {
    return this.http.put(this.baseUrl, pt)
  }

  getPatientPrescription(Pid: any) {
    return this.http.get<Prescription[]>("http://localhost:3000/prescription/patient/" + Pid)
  }

  getAppointmentById(appid: any) {
    return this.http.get<Appointment | any>("http://localhost:3000/appointments/" + appid)
  }


}
