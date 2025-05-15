import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DoctorListComponent} from './doctor-list/doctor-list.component';
import {DoctorAddComponent} from './doctor-add/doctor-add.component';
import {DoctorDeleteComponent} from './doctor-delete/doctor-delete.component';
import {DoctorEditComponent} from './doctor-edit/doctor-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {InputNumberModule} from 'primeng/inputnumber';


const routes: Routes = [
  {path: "", component: DoctorListComponent},
  {path: "add", component: DoctorAddComponent},
  //{path:"details",component:DoctorDetailsComponent},
  {path: "edit/:id", component: DoctorEditComponent},
  {path: "delete/:id", component: DoctorDeleteComponent},
]

@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorAddComponent,
    DoctorEditComponent,
    DoctorDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    FileUploadModule,
    InputNumberModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})


export class DoctorModule {
}
