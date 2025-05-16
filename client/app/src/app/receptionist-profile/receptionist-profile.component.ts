import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceptionistService } from '../receptionist.service';
import { User } from '../_models/user';
import { DoctorService } from '../Services/doctor.service';

@Component({
  selector: 'app-receptionist-profile',
  templateUrl: './receptionist-profile.component.html',
  styleUrls: ['./receptionist-profile.component.css']
})
export class ReceptionistProfileComponent implements OnInit {

  editForm: FormGroup | any;

  receptionist: User = new User("", "", "", "", 25, "", "", "", "Receptionist", "", "");

  genders: any = [];

  doctors: any[] = [];

  image!: File;

  constructor(
    private recSer: ReceptionistService,
    public router: Router,
    public ar: ActivatedRoute,
    private fb: FormBuilder,
    public http: HttpClient,
    private doctorService: DoctorService,
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.createFormValidation();

    this.ar.params.subscribe(params => {
      this.recSer.getReceptionistById(params['id']).subscribe({
        next: data => {
          this.receptionist = data;
        }
      });
    });

    this.genders = this.recSer.genders;
  }


  
  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (doctors) => this.doctors = doctors,
      error: (err) => console.error("Failed to load doctors", err)
    });
  }


  
  createFormValidation() {
    this.editForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^91[0-9]{10}$'),
      ]],
      age: ['', [
        Validators.required,
        Validators.pattern('^[2-9][0-9]$|^100$')
      ]],
      gender: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$'),
      ]],
      address: ['', Validators.required]
    });
  }

  update() {
  
    this.recSer.editReceptionist(this.receptionist).subscribe(() => {
      this.editForm.pristine = true;
    });
  }

  selectFile(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.image = file;

      const formData = new FormData();
      formData.append('file', this.image);

      this.http.post<any>('http://localhost:3000/upload', formData)
        .subscribe({
          next: (response) => {
             
            this.receptionist.profileImg = response.image; 
            
          },
          error: (err) => console.error('Image upload failed', err)
        });
    }
  }
}
