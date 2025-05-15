import { Component } from '@angular/core';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  appointment = {
    firstName: '',
    lastName: '',
    age: null,
    contact: '',
    doctorName: '',
    address: ''
  };

  successMessage = '';

  onSubmit() {
    console.log('Appointment Booked:', this.appointment);
    this.successMessage = 'Appointment booked successfully!';
    
    // Optional: Reset the form
    this.appointment = {
      firstName: '',
      lastName: '',
      age: null,
      contact: '',
      doctorName: '',
      address: ''
    };
  }
}
