import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../_services/authentication.service';
import {Role} from "../_models/role";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phone_number: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f['phone_number'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          const userType = this.authenticationService.userValue.type;
          const userId = this.authenticationService.userValue._id;

          if (userType === Role.User) {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/DoctorProfile/' + userId;
            this.router.navigateByUrl(returnUrl);
          } else if (userType === Role.Receptionist) {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile/receptionist/' + userId;
            this.router.navigateByUrl(returnUrl);
          } else if (userType === Role.Admin) {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        },
        error: error => {
          this.error = "Failed To Login: Incorrect Phone Number or Password";
          this.loading = false;
        }
      });
  }
}
