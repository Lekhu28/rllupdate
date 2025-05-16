import {Component, OnInit} from '@angular/core';
import {Medicine} from 'src/app/_models/medicine';
import {MedicineService} from 'src/app/Services/medicine.service';
import {ConfirmationService, MessageService} from 'primeng/api';



@Component({
  selector: 'app-list-medicines',
  templateUrl: './list-medicines.component.html',
  styles: [`
         :host ::ng-deep .p-dialog .product-image {
             width: 150px;
             margin: 0 auto 2rem auto;
             display: block;
         }
     `],
  providers: [MessageService, ConfirmationService]
})
export class ListMedicinesComponent implements OnInit {

  medicines: Medicine[] = [];
  medicineDialog: boolean = false;
  medicine: Medicine = new Medicine('', '', '');
  submitted: boolean = false;
  isEdit: boolean = false;



  constructor(public medicineService: MedicineService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              
  ) {
  }

  ngOnInit(): void {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });

    
  }


  clickEdit(med: Medicine) {
    this.isEdit = true;
    this.medicine = {...med};
  
    this.medicineDialog = true;
  }

  clickAdd() {
    this.isEdit = false;
    this.medicine = new Medicine('', '', '');
  
    this.medicineDialog = true;
  }

  clickDelete(i: string) {
    this.medicineService.id = i;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.medicine.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.medicineService.deleteMedicine(this.medicineService.id).subscribe(() => {
        });

        this.reloadData();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Medicine Deleted', life: 3000});
      }
    });
  }

  save() {
    if (this.isEdit) {
      this.medicineService.editMedicine(this.medicine).subscribe({
        next: a => {
          this.medicine = a;
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Medicine Updated', life: 3000});
          this.hideDialog();
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Foailed', detail: 'Medicine  Not Updated', life: 3000});
        }
      });
      this.reloadData();
    } else {
      this.medicineService.addMedicine(this.medicine).subscribe({
        next: a => {
          this.medicine = a;
          this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Medicine Added', life: 3000});
          this.hideDialog();
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Foailed', detail: 'Medicine  Not Added', life: 3000});
        }
      });
    }
    this.reloadData();
  }

  hideDialog() {
    this.reloadData();
    this.medicineDialog = false;
    this.submitted = false;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  reloadData() {
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }

}
