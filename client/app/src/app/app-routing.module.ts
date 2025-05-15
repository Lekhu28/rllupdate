import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListMedicinesComponent} from './Components/Medecine/list-medicines/list-medicines.component';
import {ListPrescriptionsComponent} from './Components/Prescription/list-prescriptions/list-prescriptions.component';
import {DoctorProfileComponent} from './doctor-profile/doctor-profile.component';
import {ErrorComponent} from './error/error.component';
import {HomeComponent} from './home/home.component';
import {ReceptionistProfileComponent} from './receptionist-profile/receptionist-profile.component';
import {AuthGuard} from "./_helpers";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {Role} from "./_models/role";
import {DoctorPatientsComponent} from "./doctor-patients/doctor-patients.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]},
  },

  {
    path: "doctors",
    loadChildren: () => import("./doctor/doctor.module").then(m => m.DoctorModule),
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin]
    }
  },
  {path: "profile/doctor/:id", component: DoctorProfileComponent},

  {
    path: "receptionists",
    loadChildren: () => import("./receptionist/receptionist.module").then(m => m.ReceptionistModule),
    canActivate: [AuthGuard],
    data: {roles: [Role.Admin]}
  },
  {path: "profile/receptionist/:id", component: ReceptionistProfileComponent},

  {path: "prescriptions", component: ListPrescriptionsComponent},
  {path: "medicines", component: ListMedicinesComponent},
  {
    path: 'patient', loadChildren: () => import("./patients/patient.module").then(m => m.PatientModule)
  },
  {path: "DoctorProfile/:id", component: DoctorProfileComponent},
  {path: "DoctorPatient/:id", component: DoctorPatientsComponent},
  {path: "**", component: ErrorComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class AppRoutingModule {
}
