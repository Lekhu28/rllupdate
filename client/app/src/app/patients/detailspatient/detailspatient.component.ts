import {Component, OnInit} from '@angular/core';
import {Patient} from '../models/patient';
import {PatientService} from '../services/patient.service';
import {Router} from '@angular/router';
import {Appointment} from '../models/appointment';

@Component({
  selector: 'app-detailspatient',
  templateUrl: './detailspatient.component.html',
  styleUrls: ['./detailspatient.component.css']
})
export class DetailspatientComponent implements OnInit {
  Patient: Patient | any;
  prescriptions: any;
  patientmedecines: any[] = [];
  appontments: any | Appointment[] = [];

  constructor(private patser: PatientService, private router: Router) {
  }

  ngOnInit(): void {
    
    this.Patient = this.patser.getPatientByID(this.patser.detailsPatientID).subscribe({
      next: a => {
        this.Patient = a;
    
    
        this.Patient.Appointment.forEach((element: any) => {


         
          
          this.patser.getAppointmentById(element).subscribe({
            next: a => {

          
              this.appontments.push(a);

            }
          })

        });


       

      }
    });
    this.prescriptions = this.patser.getPatientPrescription(this.patser.detailsPatientID).subscribe({
      next: a => {
        this.prescriptions = a;

       
        for (let i = 0; i < this.prescriptions.length; i++) {
          const element = this.prescriptions[i];
          this.patientmedecines.push({med: this.prescriptions[i].medicines})
        }
      


      }
    });

  }

  edit(): void {
    this.patser.editePatientID = this.Patient._id;
    this.router.navigate(['/patient/edit']);
  }


}
