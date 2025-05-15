import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReceptionistAddComponent} from './receptionist-add/receptionist-add.component';
import {ReceptionistEditComponent} from './receptionist-edit/receptionist-edit.component';
import {ReceptionistDeleteComponent} from './receptionist-delete/receptionist-delete.component';
import {ReceptionistListComponent} from './receptionist-list/receptionist-list.component';

import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import {InputNumberModule} from 'primeng/inputnumber';


const routes: Routes = [
  {path: "", component: ReceptionistListComponent},
  {path: "add", component: ReceptionistAddComponent},
  {path: "edit/:id", component: ReceptionistEditComponent},
  {path: "delete/:id", component: ReceptionistDeleteComponent},
]

@NgModule({
  declarations: [
    ReceptionistListComponent,
    ReceptionistAddComponent,
    ReceptionistEditComponent,
    ReceptionistDeleteComponent
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
export class ReceptionistModule {
}
