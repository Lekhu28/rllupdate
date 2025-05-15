import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {DoctorService} from './doctor.service';
import {ReceptionistService} from './receptionist.service';
import {AddpatientComponent} from './patients/addpatient/addpatient.component';
import {ListpatientComponent} from './patients/listpatient/listpatient.component';
import {EditpatientComponent} from './patients/editpatient/editpatient.component';
import {DeletepatientComponent} from './patients/deletepatient/deletepatient.component';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {DoctorProfileComponent} from './doctor-profile/doctor-profile.component';

import {ListMedicinesComponent} from './Components/Medecine/list-medicines/list-medicines.component';
import {RemovePrescriptionComponent} from './Components/Prescription/remove-prescription/remove-prescription.component';
import {AddPrescriptionComponent} from './Components/Prescription/add-prescription/add-prescription.component';
import {EditPrescriptionComponent} from './Components/Prescription/edit-prescription/edit-prescription.component';
import {ListPrescriptionsComponent} from './Components/Prescription/list-prescriptions/list-prescriptions.component';


import {DetailspatientComponent} from './patients/detailspatient/detailspatient.component';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {InputNumberModule} from 'primeng/inputnumber';
import {ReceptionistProfileComponent} from './receptionist-profile/receptionist-profile.component';

import {BrowserModule} from '@angular/platform-browser';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TabViewModule} from 'primeng/tabview';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {CalendarModule} from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';


import {TooltipModule} from 'primeng/tooltip';
import "@angular/compiler";
import {PhoneNumberPipe} from './phone-number.pipe';
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {PaymentModule} from "./payment/payment.module";
import {MatButtonModule} from "@angular/material/button";
import {ErrorInterceptor, JwtInterceptor} from "./_helpers";
import {DoctorPatientsComponent} from './doctor-patients/doctor-patients.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IncomePerMonthComponent} from './income-per-month/income-per-month.component';

import {PatientReportComponent} from './patient-report/patient-report.component';
import "chart.js";
import {RouterModule} from "@angular/router";
import { ReportInvoicesComponent } from './report-invoices/report-invoices.component';


import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  ScheduleModule,
  TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService
} from "@syncfusion/ej2-angular-schedule";
import { BookAppointmentComponent } from './appointments/book-appointment/book-appointment.component';
import { AppointmentlistComponent } from './appointments/appointmentlist/appointmentlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    DoctorProfileComponent,
    ReceptionistProfileComponent,
    AddpatientComponent,
    ListpatientComponent,
    EditpatientComponent,
    DeletepatientComponent,
    PhoneNumberPipe,
    DetailspatientComponent,

    ListMedicinesComponent,
    RemovePrescriptionComponent,
    AddPrescriptionComponent,
    EditPrescriptionComponent,
    ListPrescriptionsComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    NavbarComponent,
    DoctorPatientsComponent,
    IncomePerMonthComponent,

    PatientReportComponent,
      ReportInvoicesComponent,
      BookAppointmentComponent,
      AppointmentlistComponent,
  ],
  imports: [
    AppRoutingModule,

    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,

    CalendarModule,
    ConfirmDialogModule,

    DialogModule,
    DynamicDialogModule,
    DropdownModule,

    FormsModule,
    FileUploadModule,
    FormsModule,

    HttpClientModule,

    InputTextModule,
    InputNumberModule,

    ReactiveFormsModule,

    TableModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,

    // ListboxModule,
    // CheckboxModule,
    // ListboxModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputNumberModule,
    TooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    PaymentModule,
    ChartModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    RouterModule,
    ScheduleModule

  ],
  providers: [DoctorService, ReceptionistService, MessageService, ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
