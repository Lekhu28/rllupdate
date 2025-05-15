import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ReceptionistService} from 'src/app/receptionist.service';
import {User} from 'src/app/_models/user';

@Component({
  selector: 'app-receptionist-add',
  templateUrl: './receptionist-add.component.html',
  styleUrls: ['./receptionist-add.component.css']
})
export class ReceptionistAddComponent implements OnInit {

  addForm: FormGroup | any;

  newReceptionist: User = new User("", "", "", "", 20, "", "", "blank.jpg", "Doctor", "male", "")

  genders: any = [];

  image!: File;

  constructor(private recSer: ReceptionistService, public router: Router, private fb: FormBuilder, public http: HttpClient) {
  }

  ngOnInit(): void {

    this.createFormValidation();

    (<any>$('#myModal')).modal('show');

    this.genders = this.recSer.genders;

  }

  // validations
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
      password: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  add(e: any) {
    if (this.newReceptionist.profileImg == "blank.jpg") {
      this.newReceptionist.profileImg = this.newReceptionist.gender + ".png";
    }
    console.log(this.addForm)
    this.recSer.addReceptionist(this.newReceptionist).subscribe({
      next: a => {
        (<any>$('#myModal')).modal('hide');
        this.router.navigate(['/receptionists']);
      }
    });
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
            console.log(a);
            this.newReceptionist.profileImg = a.image;
          }
        });
    }
  }

}

// selectFile(event: any) {
//   console.log(event.target.files[0])
// 	if(!event.target.files[0] || event.target.files[0].length == 0) {
// 		console.log('You must select an image');
// 		return;
// 	}

// 	var mimeType = event.target.files[0].type;

// 	if (mimeType.match(/image\/*/) == null) {
// 		console.log("Only images are supported");
// 		return;
// 	}
//   else {
//     //this.newReceptionist._id.profileImg = event.target.files[0];
//     console.log((<HTMLInputElement>document.getElementById("profileImg"))?.value)
//     this.newReceptionist.profileImg = (<HTMLInputElement>document.getElementById("profileImg"))?.value;
//   }
// }
