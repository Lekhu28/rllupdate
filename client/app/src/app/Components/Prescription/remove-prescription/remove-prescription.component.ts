import {Component, OnInit} from '@angular/core';
import {PrescriptionService} from 'src/app/Services/prescription.service';

import {Location} from '@angular/common'

@Component({
  selector: 'app-remove-prescription',
  templateUrl: './remove-prescription.component.html',
  styleUrls: ['./remove-prescription.component.css']
})
export class RemovePrescriptionComponent implements OnInit {

  constructor(private prescriptionService: PrescriptionService, private location: Location) {
  }

  ngOnInit(): void {
    console.log(this.prescriptionService.id)
  }

  remove() {
    this.prescriptionService.deleteprescription(this.prescriptionService.id).subscribe(() => {
    });

  }

  cansel() {
    this.location.back();
  }

}
