import {Component, OnInit} from '@angular/core';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deletepatient',
  templateUrl: './deletepatient.component.html',
  styleUrls: ['./deletepatient.component.css']
})
export class DeletepatientComponent implements OnInit {

  constructor(private patser: PatientService, private router: Router) {
  }

  ngOnInit(): void {

    this.patser.deletePatient(this.patser.deletePatientID).subscribe(
      {
        next: a => {
          
        }
      }
    )
    this.router.navigate(['/patient'])

  }

}
