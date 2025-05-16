import {Component} from '@angular/core';

import {UserAuth} from '../_models/userAuth';
import {AuthenticationService} from '../_services/authentication.service';
import {UserService} from '../_services/user.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent {
  loading = false;
  user: UserAuth;
  userFromApi: UserAuth | undefined;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    
    this.user = this.authenticationService.userValue;
  }

  ngOnInit() {
    this.loading = true;

  }
}
