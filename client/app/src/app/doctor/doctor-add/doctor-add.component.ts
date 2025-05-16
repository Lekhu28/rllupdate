import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DoctorService} from 'src/app/doctor.service';
import {Doctor} from 'src/app/_models/doctor';
import {User} from 'src/app/_models/user';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {

  addForm: FormGroup | any;

  newDoctor: Doctor = new Doctor(new User("", "", "", "", 20, "", "", "blank.jpg", "Doctor", "", ""), "", [], [])

  genders: any = [];
  specialities: any = [];

  image!: File;

  constructor(private drSer: DoctorService, public router: Router, private fb: FormBuilder, public http: HttpClient) {
  }

  ngOnInit(): void {

    (<any>$('#myModal')).modal('show');

    this.genders = this.drSer.genders;

    this.specialities = this.drSer.specialities;

    this.createFormValidation();

  }


  createFormValidation() {
    this.addForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]
      ],
      lastName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]
      ],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^91[0-9]{10}$'),
      ]
      ],
      age: ['', [
        Validators.required,
        Validators.pattern('^[2-9][0-9]$|^100$')
      ]
      ],
      gender: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$'),
      ]
      ],
      password: ['', Validators.required],
      speciality: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  add(e: any) {
    if (this.newDoctor._id.profileImg == "blank.jpg") {
      this.newDoctor._id.profileImg = this.newDoctor._id.gender + ".png";
    }
    
    this.drSer.addDoctor(this.newDoctor).subscribe({
      next: a => {
        this.newDoctor = a;
        (<any>$('#myModal')).modal('hide');
        this.router.navigate(['/doctors']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/doctors']);
  }

  selectFile(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.image = file;

      const formData = new FormData();
      formData.append('file', this.image);

      this.http.post<any>('http://localhost:3000/upload', formData)
        .subscribe({
          next: (a) => {
          
            this.newDoctor._id.profileImg = a.image;
          }
        });
    }
  }

}
