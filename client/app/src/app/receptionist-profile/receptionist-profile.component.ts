import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ReceptionistService} from '../receptionist.service';
import {User} from '../_models/user';

@Component({
  selector: 'app-receptionist-profile',
  templateUrl: './receptionist-profile.component.html',
  styleUrls: ['./receptionist-profile.component.css']
})
export class ReceptionistProfileComponent implements OnInit {

  editForm: FormGroup | any;

  eReceptionist: User = new User("", "", "", "", 25, "", "", "", "Receptionist", "", "")

  genders: any = [];

  image!: File;

  constructor(private recSer: ReceptionistService, public router: Router, public ar: ActivatedRoute, private fb: FormBuilder, public http: HttpClient) {
  }

  ngOnInit(): void {

    this.createFormValidation();

    this.ar.params.subscribe(a => {
      this.recSer.getReceptionistById(a['id']).subscribe({
        next: a => {
          this.eReceptionist = a;
        }
      })
    })

    this.genders = this.recSer.genders;

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
      address: ['', Validators.required]
    });
  }

  update() {
    console.log(this.eReceptionist)
    this.recSer.editReceptionist(this.eReceptionist).subscribe(
      a => {
        this.editForm.pristine = true;
      }
    )
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
            this.eReceptionist.profileImg = a.image;
          }
        });
    }
  }

}
