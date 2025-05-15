import {Component, OnInit, ViewChild} from '@angular/core';
import {UIChart} from 'primeng/chart/chart';
import {PaymentService} from '../_services/payment.service';

@Component({
  selector: 'app-income-per-month',
  templateUrl: './income-per-month.component.html',
  styleUrls: ['./income-per-month.component.css'],
})
export class IncomePerMonthComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  chartOptions: any;
  income25: number[] = new Array(12).fill(0);
  income26: number[] = new Array(12).fill(0);

  @ViewChild('chart') chart?: UIChart;

  constructor(public paymentService: PaymentService) {
  }

  ngOnInit(): void {


    this.basicData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'income 2025',
          backgroundColor: '#6878d5',
          data: this.income25,
        },
        {
          label: 'income 2026',
          backgroundColor: '#ff9999',
          data: this.income26,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
}
