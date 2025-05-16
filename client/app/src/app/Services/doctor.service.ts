import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Doctor} from 'src/app/_models/doctor';
import {SelectItem} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  genders: Array<SelectItem> = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]
  specialities: Array<SelectItem> = [
    {label: 'Dentist', value: 'dentist'},
    {label: 'Allergist', value: 'allergist'},
    {label: 'Dermatologist', value: 'dermatologist'},
    {label: 'Ophthalmologist', value: 'ophthalmologist'},
    {label: 'Obstetrician', value: 'obstetrician'},
    {label: 'Cardiologist', value: 'cardiologist'},
    {label: 'Endocrinologist', value: 'endocrinologist'},
    {label: 'Gastroenterologist', value: 'gastroenterologist'},
    {label: 'Nephrologist', value: 'nephrologist'},
    {label: 'Urologist', value: 'urologist'},
    {label: 'Pulmonologist', value: 'pulmonologist'},
    {label: 'Otolaryngologist', value: 'otolaryngologist'},
    {label: 'Neurologist', value: 'neurologist'},
    {label: 'Psychiatrist', value: 'psychiatrist'},
    {label: 'Oncologist', value: 'oncologist'},
    {label: 'Radiologist', value: 'radiologist'},
    {label: 'Rheumatologist', value: 'rheumatologist'},
    {label: 'General surgeon', value: 'general surgeon'},
    {label: 'Orthopedic surgeon', value: 'orthopedic surgeon'},
    {label: 'Cardiac surgeon', value: 'cardiac surgeon'},
    {label: 'Anesthesiologist', value: 'anesthesiologist'},
    {label: 'Family Physician', value: 'family physician'},
    {label: 'Hematologist', value: 'hematologist'},
  ]
  private baseUrl: string = "http://localhost:3000/doctors"

  constructor(public http: HttpClient) {
  }

  getAllDoctors() {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  getDoctorById(id: string) {
    return this.http.get<Doctor>(this.baseUrl + "/" + id);
  }

  addDoctor(dr: Doctor) {
    return this.http.post<Doctor>(this.baseUrl, dr);
  }

  editDoctor(dr: Doctor) {
    return this.http.put<Doctor>(this.baseUrl, dr);
  }

  deleteDoctor(id: string) {
    return this.http.delete(this.baseUrl + "/" + id);
  }

}
