import { Component, OnInit} from '@angular/core';
import { PaymentService } from "../_services/payment.service";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report-invoices',
  templateUrl: './report-invoices.component.html',
  styleUrls: ['./report-invoices.component.css']
})
export class ReportInvoicesComponent implements OnInit {

  payments: any[] = [];
  durationInSeconds = 5;
  displayedColumns: string[] = ['patient', 'date', 'charges', 'method'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.getAllPayment();
  }

  getAllPayment() {
    this.paymentService.getAll().subscribe({
      next: values => {
        this.payments = values
        this.dataSource = new MatTableDataSource<any>(values);
        
      },
      error: err => console.error(err)
    })
  }

}
