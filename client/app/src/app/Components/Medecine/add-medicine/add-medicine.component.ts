import {Component, OnInit} from '@angular/core';
import {Medicine} from 'src/app/_models/medicine';
import {MedicineService} from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {

  newMedicine: Medicine = new Medicine('', '', '');

  constructor(private medicineService: MedicineService) {

  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.newMedicine);
    this.medicineService.addMedicine(this.newMedicine).subscribe((res) => {
      // this.medicines = res;
    });
  }

}
