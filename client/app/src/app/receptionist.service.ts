import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {User} from './_models/user';


@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {

  genders: Array<SelectItem> = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ]
  private baseUrl: string = "http://localhost:3000/receptionists"

  constructor(public http: HttpClient) {
  }

  getAllReceptionists() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getReceptionistById(id: string) {
    return this.http.get<User>(this.baseUrl + "/" + id);
  }

  addReceptionist(res: User) {
    return this.http.post<User>(this.baseUrl, res);
  }

  editReceptionist(res: User) {
    return this.http.put<User>(this.baseUrl, res);
  }

  deleteReceptionist(id: string) {
    return this.http.delete(this.baseUrl + "/" + id);
  }

}
