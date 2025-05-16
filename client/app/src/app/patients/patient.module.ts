import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AddpatientComponent} from './addpatient/addpatient.component';
import {ListpatientComponent} from './listpatient/listpatient.component';
import {EditpatientComponent} from './editpatient/editpatient.component';
import {DeletepatientComponent} from './deletepatient/deletepatient.component';
import {DetailspatientComponent} from './detailspatient/detailspatient.component';
import {FormsModule} from '@angular/forms';


const router: Routes = [
  {path: "", component: ListpatientComponent},
  {path: "delete", component: DeletepatientComponent},
  {path: "details", component: DetailspatientComponent},
  {path: "edit", component: EditpatientComponent},
  {path: 'add', component: AddpatientComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild(router)
  ]
})
export class PatientModule {
}
