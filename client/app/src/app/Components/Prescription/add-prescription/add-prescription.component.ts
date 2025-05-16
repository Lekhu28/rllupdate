import {Component, OnInit} from '@angular/core';
import {Medicine} from 'src/app/_models/medicine';
import {Prescription} from 'src/app/_models/prescription';
import {PrescriptionService} from 'src/app/Services/prescription.service';
import {MedicineService} from 'src/app/Services/medicine.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {PatientService} from 'src/app/Services/patient.service';
import {Patient} from 'src/app/_models/patient';
import {Doctor} from 'src/app/_models/doctor';
import {DoctorService} from 'src/app/Services/doctor.service';


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css'],
  styles: [`
         :host ::ng-deep .p-dialog {
             width: 150px;
             margin: 0 auto 2rem auto;
             display: block;
         }
     `],

})
export class AddPrescriptionComponent implements OnInit {

  medicines: Medicine[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  med: string = "";
  dose: string = "";
  form: FormGroup | any;
  addForm: FormGroup | any;
  submitted: boolean = false;
  presDialog: boolean = false;
  isAdd: boolean = false;
  arr: [{ medicine: string, dose: string }] = [{medicine: '', dose: ''}];
  prescription: Prescription = new
  Prescription('', new Date, '', '', [{medicine: "", dose: ""},]);

  constructor(private prescriptionService: PrescriptionService,
              public medicineService: MedicineService,
              public patientService: PatientService,
              public doctorService: DoctorService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.presDialog = true;
    this.medicineService.getAllMedicines().subscribe((res) => {
      this.medicines = res;
    });
    this.patientService.getpatients().subscribe((res) => {
      this.patients = res;
    });
    this.doctorService.getAllDoctors().subscribe((res) => {
      this.doctors = res;
    });

    this.formValidation();
  }

  add() {
    if (this.isAdd) {

      if (this.med != "" && this.dose != "") {

        if (this.arr.find((x) => x.medicine === this.med)) {
  
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Failed To Add Duplicated Medicine',
            life: 3000
          });
        } else {
        
          if (this.arr[0].medicine != "" && this.arr[0].dose != "") {
            this.arr.push({medicine: this.med, dose: this.dose});
          } else {
            this.arr[0] = {medicine: this.med, dose: this.dose};
          }
        }
      }
    } else {
      this.isAdd = true;
    }
  }

  save() {
    this.presDialog = false;
    this.submitted = true;
    this.prescription.medicines = this.arr;

    this.prescriptionService.addprescription(this.prescription).subscribe({
      next: a => {
        this.prescription = a;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Prescription Added', life: 3000});
        this.hideDialog();
      },
      error: () => {
        this.messageService.add({severity: 'error', summary: 'Foailed', detail: 'Prescription  Not Added', life: 3000});
      }
    });

  }

  hideDialog() {
    this.presDialog = false;
    this.submitted = false;
    this.ref.close();
  }

  formValidation() {
    this.form = this.formBuilder.group({
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      patient: ['', Validators.required],
      medicine: ['', Validators.required],
      medicines: ['',
        Validators.required,
      ],
    });
    this.addForm = this.formBuilder.group({
      medDose: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(8),
      ]
      ],
      medicine: ['', Validators.required],
    });
  }

}
