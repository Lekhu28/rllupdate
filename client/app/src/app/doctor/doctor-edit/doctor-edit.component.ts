import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DoctorService} from 'src/app/doctor.service';
import {Doctor} from 'src/app/_models/doctor';
import {User} from 'src/app/_models/user';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  editForm: FormGroup | any;

  eDoctor: Doctor = new Doctor(new User("", "", "", "", 25, "", "", "", "Doctor", "", ""), "", [], [])

  genders: any = [];
  specialities: any = [];

  image!: File;

  constructor(private drSer: DoctorService, public router: Router, public ar: ActivatedRoute, private fb: FormBuilder, public http: HttpClient) {
  }

  ngOnInit(): void {
    this.createFormValidation();

    (<any>$('#myModal')).modal('show');

    this.ar.params.subscribe(a => {
      this.drSer.getDoctorById(a['id']).subscribe({
        next: a => {
          this.eDoctor = a;
        }
      })
    })

    this.genders = this.drSer.genders;

    this.specialities = this.drSer.specialities;

  }

  // validations
  createFormValidation() {
    this.editForm = this.fb.group({
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
        Validators.pattern('^(010|011|012|015)[0-9]{8}$'),
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
      speciality: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  update() {
    console.log(this.eDoctor)
    this.drSer.editDoctor(this.eDoctor).subscribe(
      a => {
        (<any>$('#myModal')).modal('hide');
        this.router.navigate(['/doctors']);
      }
    )
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
            console.log(a);
            this.eDoctor._id.profileImg = a.image;
          }
        });
    }
  }

}
