import {Component, OnInit} from '@angular/core';
import {MedicineService} from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-remove-medicine',
  templateUrl: './remove-medicine.component.html',
  styleUrls: ['./remove-medicine.component.css']
})
export class RemoveMedicineComponent implements OnInit {

  constructor(private medicineService: MedicineService) {
  }

 
  ngOnInit(): void {


  }

  remove() {

    this.medicineService.deleteMedicine(this.medicineService.id).subscribe((res) => {
 
    });

  }

}
