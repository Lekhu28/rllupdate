import {Component, OnInit} from '@angular/core';
import {Medicine} from 'src/app/_models/medicine';
import {MedicineService} from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.css']
})
export class EditMedicineComponent implements OnInit {

  newMedicine: Medicine = new Medicine('', '', '');
  id: string = '';

  constructor(private medicineService: MedicineService) {
  }

  ngOnInit(): void {
    this.newMedicine._id = this.medicineService.id;
  }

  edit() {
    this.medicineService.editMedicine(this.newMedicine).subscribe((res) => {
   
    });
  }

}
