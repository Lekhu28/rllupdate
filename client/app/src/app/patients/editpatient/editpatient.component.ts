import {Component, OnInit} from '@angular/core';
import {Patient} from '../models/patient';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-editpatient',
  templateUrl: './editpatient.component.html',
  styleUrls: ['./editpatient.component.css']
})

export class EditpatientComponent implements OnInit {

  angForm: FormGroup | any;
  newPatient: Patient | any;
  editePatient: Patient | any;
  errormessage: string | any;

  constructor(private patser: PatientService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      fname: ['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      lname: ['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      address: ['', Validators.required],
      phone_number: ['', Validators.required, Validators.pattern('^(010|011|012|015)[0-9]{8}$')],
      age: ['', Validators.required, Validators.pattern('^(010|011|012|015)[0-9]{8}$')],
      gender: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("hello");
    (<any>$('#okModal')).modal('hide');
    (<any>$('#errorModal')).modal('hide');
    (<any>$('#editModal')).modal('show');
    console.log(this.patser.editePatientID);
    this.newPatient = this.patser.getPatientByID(this.patser.editePatientID).subscribe({
      next: a => {
        this.newPatient = a;
        console.log(a);

      }
    });
    if (this.newPatient.profile_img == null || this.newPatient.profile_img == "user.png") {
      this.newPatient.profile_img = this.newPatient.gender + ".png"
    }
  }

  ngOnChanges(): void {
    this.newPatient = this.patser.getPatientByID(this.patser.editePatientID).subscribe({
      next: a => {
        this.newPatient = a;


      }
    });
  }

  close() {
    (<any>jQuery('#editModal')).modal('hide');
    (<any>jQuery('#errorModal')).modal('hide');
    (<any>$('#okModal')).modal('hide');
    this.router.navigate(['/patient']);

  }

  selectChangeHandler(event: any) {

    this.newPatient.gender = event.target.value;
  }

  edit() {
    console.log("editbutton");
    // this.newPatient.first_name=this.angForm.fname;
    // this.newPatient.last_name=this.angForm.lname;
    // this.newPatient.address=this.angForm.address;
    // this.newPatient.age=this.angForm.age;
    // this.newPatient.gender=this.angForm.gender;
    // console.log(this.angForm.value);
    console.log(this.newPatient);
    this.patser.updatePatient(this.newPatient).subscribe(
      {
        next: a => {
          this.newPatient = a;
          console.log(a);


          (<any>jQuery('#editModal')).modal('hide')
        },
        complete: () => {
          console.log("complete");
          (<any>$('#okModal')).modal('show');
        },
        error: (e) => {
          console.log(e.error);
          this.errormessage = e.error;
          (<any>jQuery('#editModal')).modal('hide');
          (<any>$('#okModal')).modal('hide');
          (<any>jQuery('#errorModal')).modal('show');

        }
      }
    );


  }

  agin(): void {
    // this.router.navigate(['/patient/edit']);
    (<any>jQuery('#addModal')).modal('show');
    (<any>jQuery('#okModal')).modal('hide');

  }

  return(): void {
    (<any>jQuery('#okModal')).modal('hide');
    this.router.navigate(['/patient']);
  }

}
