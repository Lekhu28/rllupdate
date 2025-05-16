import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentService} from "../../_services/payment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PatientService} from "../../Services/patient.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  paymentForm!: FormGroup
  actionBtn: string = "Save"
  patients: any[] = []

  constructor(private formBuilder: FormBuilder,
              private paymentService: PaymentService,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editDate: any,
              private _snackBar: MatSnackBar,
              public patientService: PatientService
  ) {
  }

  ngOnInit(): void {
    this.getAllPatient()
    this.paymentForm = this.formBuilder.group({
      amount: ['', Validators.required],
      method: ['', Validators.required],
      patient: ['', Validators.required]
    })
    if (this.editDate) {
      this.actionBtn = "Update"
      this.paymentForm.controls['method'].setValue(this.editDate.method)
      this.paymentForm.controls['amount'].setValue(this.editDate.charges)
      this.paymentForm.controls['patient'].setValue(this.editDate.patient)
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 30});
  }

  addPayment() {
    if (!this.editDate) {
      if (this.paymentForm?.valid) {
        const {method, amount, patient} = this.paymentForm?.value;
        this.paymentService.create({date: new Date().toDateString(), method, charges: amount, patient}).subscribe({
          next: value => {
            this.paymentForm?.reset();
            this.dialogRef.close('save')
            this.openSnackBar("Payment Added successfully", " Okay");

          },
          error: err => console.error(err)
        })
      }
    } else {
      this.updateProduct()
    }
  }

  getAllPatient() {
    this.patientService.getpatients().subscribe({
      next: values => {
        this.patients = values
      },
      error: err => console.error(err)
    })
  }

  private updateProduct() {
    const {method, amount, patient} = this.paymentForm?.value
    this.paymentService.update({
      charges: amount,
      method,
      id: this.editDate._id,
      patient
    }).subscribe({
      next: () => {
        this.paymentForm?.reset();
        this.dialogRef.close('update')

      },
      error: err => console.error(err)
    })
  }
}
