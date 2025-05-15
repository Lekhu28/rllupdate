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
    age: null as number | null,
    contact: '',
    doctorName: '',
    address: ''
  };

  successMessage = '';
  contactPattern = /^91\d{8,}$/;  // Starts with 91 + at least 8 more digits

  onSubmit() {
  if (!this.contactPattern.test(this.appointment.contact)) {
    alert('Contact number must start with "91" and have at least 10 digits total.');
    return;
  }

  const doctorAppointmentsKey = `appointments_${this.appointment.doctorName}`;
  const savedAppointments = JSON.parse(localStorage.getItem(doctorAppointmentsKey) || '[]');
  savedAppointments.push(this.appointment);
  localStorage.setItem(doctorAppointmentsKey, JSON.stringify(savedAppointments));

  this.successMessage = 'Appointment booked successfully!';

  // Reset form
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