import {Component, OnInit} from '@angular/core';

import {Patient} from "../patients/models/patient";
import {PatientService} from '../patients/services/patient.service';

@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.css']
})
export class PatientReportComponent implements OnInit {
  data: any;
  chartOptions: any;
  patlist: Patient[] = [];
  Female = 0;
  Male = 0;

  constructor(private patser: PatientService) {
  }

  ngOnInit(): void {
    this.patlist = this.patser.patientlist;
    this.patser.getpatients().subscribe(
      {
        next: a => {
          this.patser.patientlist = a;
          console.log(this.patser.patientlist);
          this.patlist = this.patser.patientlist;
          this.patlist.forEach(patient => {
            if (patient.gender == "female")
              this.Female += 1;
            else if (patient.gender == "male")
              this.Male += 1;
          });
          this.data = {
            labels: ['Female', 'Male'],
            datasets: [
              {
                data: [this.Female, this.Male],
                backgroundColor: [

                  "#E685B5",
                  "#42A5F5",

                ],
                hoverBackgroundColor: [
                  "#EFADCE",
                  "#64B5F6",

                ]
              }
            ]
          };
        }
      });
  }
}


