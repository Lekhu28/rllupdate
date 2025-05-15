import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {UserAuth} from '../_models/userAuth';
import {TokenStorageService} from "./token-storage.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public user: Observable<UserAuth>;
  private userSubject: BehaviorSubject<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    // @ts-ignore
    this.userSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('currentUser')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserAuth {
    return this.userSubject.value;
  }

  login(phoneNumber: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, {phoneNumber, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.tokenStorage.saveToken(user.token);
        this.tokenStorage.saveUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.http.post(`${environment.apiUrl}/users/logout`, {}).subscribe()
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
