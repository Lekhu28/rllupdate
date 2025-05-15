import {Component, OnInit} from '@angular/core';
import {Prescription} from 'src/app/_models/prescription';
import {PrescriptionService} from 'src/app/Services/prescription.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MedicineService} from 'src/app/Services/medicine.service';
import {Medicine} from 'src/app/_models/medicine';
import {DialogService} from 'primeng/dynamicdialog';
import {AddPrescriptionComponent} from '../add-prescription/add-prescription.component';
import {EditPrescriptionComponent} from '../edit-prescription/edit-prescription.component';


@Component({
  selector: 'app-list-prescriptions',
  templateUrl: './list-prescriptions.component.html',
  styles: [`
         :host ::ng-deep .p-dialog  {
             width: 150px;
             margin: 0 auto 2rem auto;
             display: block;
         }
     `],
  providers: [MessageService, ConfirmationService, DialogService]
})

export class ListPrescriptionsComponent implements OnInit {

  prescriptions: Prescription[] = [];
  prescriptionsList: Prescription[] = [...this.prescriptions];
  medicines: Medicine[] = [];
  // patient: Patient = new Patient('', '', '', '', 0, '', '', '');

  prescription: Prescription = new Prescription('', new Date, '', '', [{medicine: "", dose: ""},]);

  med: string = "";
  dose: string = "";

  presDialog: boolean = false;
  submitted: boolean = false;
  isEdit: boolean = false;

  arr: [{ medicine: string, dose: string }] = [{medicine: '', dose: ''}];

  constructor(public prescriptionService: PrescriptionService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private medicineService: MedicineService,
              // public patientService: PatientService,
              private dialogService: DialogService,
  ) {

  }

  ngOnInit(): void {
    this.prescriptionService.getAllprescriptions().subscribe((res) => {
      this.prescriptions = res;
      this.findData();
    });
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });

  }


  showAdd() {
    const ref = this.dialogService.open(AddPrescriptionComponent, {
      header: 'Add Prescription',
      width: '70%'
    });

    ref.onClose.subscribe(() => {
      this.reloadData();
    });
  }

  showEdit(pres: Prescription) {
    const ref = this.dialogService.open(EditPrescriptionComponent, {
      data: {
        pre: pres,
      },
      header: 'Edit prescription',
      width: '70%'
    });

    ref.onClose.subscribe(() => {
      this.reloadData();
    });
  }

  clickDelete(i: string) {

    this.prescriptionService.id = i;

    console.log("in delete");

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.prescription._id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log("in accept");
        this.prescriptionService.deleteprescription(this.prescriptionService.id).subscribe(() => {
        });

        // this.products = this.products.filter(val => val.id !== product.id);
        // this.product = {};
        this.reloadData();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Prescription Deleted',
          life: 3000
        });
      }
    });
    this.reloadData();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.prescriptions.length; i++) {
      if (this.prescriptions[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  reloadData() {
    this.prescriptionService.getAllprescriptions().subscribe((res) => {
      this.prescriptions = res;
      this.findData();
    });
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  findData() {
    this.prescriptionsList = [...this.prescriptions];
  }
}
