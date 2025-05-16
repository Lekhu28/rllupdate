import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {UserAuth} from '../_models/userAuth';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<UserAuth[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<UserAuth>(`${environment.apiUrl}/users/${id}`);
  }
}
