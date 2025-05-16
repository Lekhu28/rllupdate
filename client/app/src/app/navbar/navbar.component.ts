import {Component} from '@angular/core';
import {UserAuth} from "../_models/userAuth";
import {AuthenticationService} from "../_services/authentication.service";
import {Role} from "../_models/role";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user: UserAuth | undefined;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  get isAdmin() {
    return this.user && this.user.type === Role.Admin;
  }

  get isReceptionist() {
    return this.user && this.user.type === Role.Receptionist;
  }

  get isDoctor() {
    return this.user && this.user.type === Role.User;
  }

  logout() {
    this.authenticationService.logout();
  }
}
