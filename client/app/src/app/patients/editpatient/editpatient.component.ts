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
      phone_number: ['', Validators.required, Validators.pattern('^91[0-9]{10}$')],
      age: ['', Validators.required, Validators.pattern('^[2-9][0-9]$|^100$')],
      gender: ['', Validators.required]
    });
  }

  ngOnInit(): void {
     
    (<any>$('#okModal')).modal('hide');
    (<any>$('#errorModal')).modal('hide');
    (<any>$('#editModal')).modal('show');
    
    this.newPatient = this.patser.getPatientByID(this.patser.editePatientID).subscribe({
      next: a => {
        this.newPatient = a;
        
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
    
     
    this.patser.updatePatient(this.newPatient).subscribe(
      {
        next: a => {
          this.newPatient = a;
     


          (<any>jQuery('#editModal')).modal('hide')
        },
        complete: () => {
       
          (<any>$('#okModal')).modal('show');
        },
        error: (e) => {
    
          this.errormessage = e.error;
          (<any>jQuery('#editModal')).modal('hide');
          (<any>$('#okModal')).modal('hide');
          (<any>jQuery('#errorModal')).modal('show');

        }
      }
    );


  }

  again(): void {
    
    (<any>jQuery('#addModal')).modal('show');
    (<any>jQuery('#okModal')).modal('hide');

  }

  return(): void {
    (<any>jQuery('#okModal')).modal('hide');
    this.router.navigate(['/patient']);
  }

}
