import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ReceptionistService} from 'src/app/receptionist.service';
import {User} from 'src/app/_models/user';

@Component({
  selector: 'app-receptionist-edit',
  templateUrl: './receptionist-edit.component.html',
  styleUrls: ['./receptionist-edit.component.css']
})
export class ReceptionistEditComponent implements OnInit {

  editForm: FormGroup | any;

  eReceptionist: User = new User("", "", "", "", 25, "", "", "", "Doctor", "male", "")

  genders: any = [];

  image!: File;

  constructor(private recSer: ReceptionistService, public router: Router, public ar: ActivatedRoute, private fb: FormBuilder, public http: HttpClient) {
  }

  ngOnInit(): void {
    this.createFormValidation();

    (<any>$('#myModal')).modal('show');

    this.ar.params.subscribe(a => {
      this.recSer.getReceptionistById(a['id']).subscribe({
        next: a => {
          this.eReceptionist = a;
        }
      })
    })

    this.genders = this.recSer.genders;

  }


  
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
      address: ['', Validators.required]
    });
  }

  update() {
 
    this.recSer.editReceptionist(this.eReceptionist).subscribe(
      a => {
        (<any>$('#myModal')).modal('hide');
        this.router.navigate(['/receptionists']);
      }
    )
  }

  goBack() {
    this.router.navigate(['/receptionists']);
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
             
            this.eReceptionist.profileImg = a.image;
          }
        });
    }
  }

}
