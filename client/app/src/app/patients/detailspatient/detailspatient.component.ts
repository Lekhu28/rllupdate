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
    console.log(this.patser.editePatientID);
    this.Patient = this.patser.getPatientByID(this.patser.detailsPatientID).subscribe({
      next: a => {
        this.Patient = a;
        console.log(a);
        console.log(this.Patient.Appointment);
        this.Patient.Appointment.forEach((element: any) => {


          //   const element = this.Patient.Appointment[index];
          this.patser.getAppointmentById(element).subscribe({
            next: a => {

              console.log(a);
              this.appontments.push(a);

            }
          })

        });


        console.log(this.appontments);

      }
    });
    this.prescriptions = this.patser.getPatientPrescription(this.patser.detailsPatientID).subscribe({
      next: a => {
        this.prescriptions = a;

        console.log(this.prescriptions[0].medicines[0].dose);
        console.log(this.prescriptions[0].medicines[0].medicine.name);
        for (let i = 0; i < this.prescriptions.length; i++) {
          const element = this.prescriptions[i];
          this.patientmedecines.push({med: this.prescriptions[i].medicines})
        }
        console.log(this.prescriptions[0].medicines[0].medicine);
        console.log(this.patientmedecines[0][0])
        console.log(this.patientmedecines);


      }
    });

  }

  edit(): void {
    this.patser.editePatientID = this.Patient._id;
    this.router.navigate(['/patient/edit']);
  }


}
