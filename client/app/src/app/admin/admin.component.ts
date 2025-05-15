import { Component } from '@angular/core';
import { EventSettingsModel, MonthService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  providers: [WeekService, MonthService, WorkWeekService],
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  defaultData: Object[] = [
    {
      Id: 1,
      Subject: 'Appointment Sagar',
      StartTime: new Date(2025, 4, 14, 10, 0),  // Changed to 14/05/2025
      EndTime: new Date(2025, 4, 14, 11, 0),    // Changed to 14/05/2025
      IsAllDay: false
    },
    {
      Id: 2,
      Subject: 'Appointment Prateek',
      StartTime: new Date(2025, 4, 15, 10, 0),  // Changed to 15/05/2025
      EndTime: new Date(2025, 4, 16, 12, 30),
      IsAllDay: false
    },
    {
      Id: 3,
      Subject: 'Appointment Shivam',
      StartTime: new Date(2025, 4, 19, 12, 0),
      EndTime: new Date(2025, 4, 19, 12, 30),
      IsAllDay: false
    },
    {
      Id: 4,
      Subject: 'Appointment Amir',
      StartTime: new Date(2025, 4, 20, 10, 0),
      EndTime: new Date(2025, 4, 20, 10, 30),
      IsAllDay: false
    }
  ];

  public selectedDate: Date = new Date(2025, 4, 14);  // Changed to 14/05/2025
  public showWeekend: boolean = false;
  public eventSettings: EventSettingsModel = { dataSource: this.defaultData };
}
