import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from "../_services/payment.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payments: any[] = [];
  durationInSeconds = 5;
  displayedColumns: string[] = ['_id', 'patient', 'date', 'charges', 'method', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              public paymentService: PaymentService) {

  }

  ngOnInit(): void {
    this.getAllPayment();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe((value => {
      if (value == 'save') {
        this.getAllPayment()
      }
    }));
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 1000});
  }

  getAllPayment() {
    this.paymentService.getAll().subscribe({
      next: values => {
        this.payments = values
        this.dataSource = new MatTableDataSource<any>(values);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => console.error(err)
    })
  }

  editPayment(row: any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(value => {
      if (value == 'update') {
        this.getAllPayment();
        this.openSnackBar("Payment Update successfull", " ");
      }

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePayment(id: any) {
    this.paymentService.delete(id).subscribe({
      next: () => {
         
        this.getAllPayment()
        this.openSnackBar("Payment Delete successfull", "");

      },
      error: err => console.error(err)
    })
  }
}
