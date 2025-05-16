import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})

export class AddpatientComponent implements OnInit {
  angForm: FormGroup | any;
  newPatient: Patient = new Patient('', '', '', '', 1, '', '', 'blank.jpg', []);
  errormessage: string | any;


  fileName!: File;

  constructor(private patser: PatientService, private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required


      ],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }


  ngOnInit(): void {

    ("hello");
    (<any>$('#addModal')).modal('show');
    (<any>$('#errorModal')).modal('hide');
    (<any>$('#okModal')).modal('hide');
  }

  close() {
    (<any>jQuery('#addModal')).modal('hide');
    (<any>jQuery('#errorModal')).modal('hide');
    (<any>jQuery('#okModal')).modal('hide');


    this.router.navigate(['/patient']);

  }

  selectChangeHandler(event: any) {


    this.newPatient.gender = event.target.value;
  }

  add() {





    if (this.newPatient.profile_img == null || this.newPatient.profile_img == "user.png") {
      this.newPatient.profile_img = this.newPatient.gender + ".png"
    }
    this.patser.addPatient(this.newPatient).subscribe(
      {
        next: a => {

          this.newPatient = a;




          (<any>jQuery('#addModal')).modal('hide')
        }, complete: () => {

          (<any>$('#okModal')).modal('show');
        },
        error: (e) => {

          this.errormessage = e.error;
          (<any>jQuery('#addModal')).modal('hide');
          (<any>jQuery('#okModal')).modal('hide');
          (<any>jQuery('#errorModal')).modal('show');

        }
      })

  }

  agin(): void {


    (<any>jQuery('#addModal')).modal('show');
    (<any>jQuery('#okModal')).modal('hide');

  }

  return(): void {
    (<any>jQuery('#okModal')).modal('hide');
    this.router.navigate(['/patient']);
  }

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file;

      const formData = new FormData();
      formData.append('file', this.fileName);

      this.http.post<any>('http://localhost:3000/patient/', formData).subscribe(
        {
          next: (a) => {

            this.newPatient.profile_img = a.filename;
          },
          error: (e) => (e)
        }
      );
    }

  }

}
