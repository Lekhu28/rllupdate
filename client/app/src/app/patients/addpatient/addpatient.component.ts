import {Component, OnInit} from '@angular/core';
import {Patient} from '../models/patient';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})

export class AddpatientComponent implements OnInit {
  angForm: FormGroup | any;
  newPatient: Patient = new Patient(0, '', '', '', 1, '', '', null, []);
  errormessage: string | any;
  //newPatient: Patient |any;
  fileName: string | any = "user.png";

  constructor(private patser: PatientService, private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required

        // , Validators.pattern('^(010|011|012|015)[0-9]{8}$')
      ],
      age: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.newPatient.profile_img = this.fileName;
    console.log("hello");
    (<any>$('#addModal')).modal('show');
    (<any>$('#errorModal')).modal('hide');
    (<any>$('#okModal')).modal('hide');
  }

  close() {
    (<any>jQuery('#addModal')).modal('hide');
    (<any>jQuery('#errorModal')).modal('hide');
    (<any>jQuery('#okModal')).modal('hide');
    //this.router.navigate(['/Home']);
    this.router.navigate(['/patient']);

  }

  selectChangeHandler(event: any) {
    //update the ui
    this.newPatient.gender = event.target.value;
  }

  add() {
    console.log(this.angForm.value);
    console.log("addbutton");

    // this.newPatient.first_name=this.angForm.fname;
    // this.newPatient.last_name=this.angForm.lname;
    // this.newPatient.address=this.angForm.address;
    // this.newPatient.age=this.angForm.age;
    // this.newPatient.gender=this.angForm.gender;
    console.log(this.newPatient.profile_img);
    if (this.newPatient.profile_img == null || this.newPatient.profile_img == "user.png") {
      this.newPatient.profile_img = this.newPatient.gender + ".png"
    }
    this.patser.addPatient(this.newPatient).subscribe(
      {
        next: a => {
          console.log(a);
          this.newPatient = a;
          //this.router.navigate(['/Home']);


          (<any>jQuery('#addModal')).modal('hide')
        }, complete: () => {
          console.log("complete");
          (<any>$('#okModal')).modal('show');
        },
        error: (e) => {
          console.log(e.error);
          this.errormessage = e.error;
          (<any>jQuery('#addModal')).modal('hide');
          (<any>jQuery('#okModal')).modal('hide');
          (<any>jQuery('#errorModal')).modal('show');

        }
      })

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

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file;

      // const formData = new FormData();

      // formData.append('file', this.fileName);
      console.log(file);
      console.log(this.fileName)
      const formData = new FormData();
      formData.append('file', this.fileName);

      this.http.post<any>('http://localhost:3000/patient/file', formData).subscribe(
        {
          next: (a) => {
            console.log(a)
            this.newPatient.profile_img = a.filename;
          },
          error: (e) => console.log(e)
        }
      );
    }
    console.log(this.fileName)
  }

}
