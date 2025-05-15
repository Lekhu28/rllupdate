import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.css']
})
export class DoctorPatientsComponent {

  loading: boolean = false;
  patlist: any[] = [];  // Array to store patient data
  doctor: any;  // Placeholder for doctor data
  imagePath: any;  // Placeholder for image path

  constructor(private router: Router) {
    // Dummy data for patients
    this.patlist = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123-456-7890',
        address: '123 Elm Street',
        age: 30,
        gender: 'Male',
        profileImg: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '987-654-3210',
        address: '456 Oak Avenue',
        age: 25,
        gender: 'Female',
        profileImg: 'https://via.placeholder.com/50'
      },
      {
        id: 3,
        firstName: 'Samuel',
        lastName: 'Green',
        phoneNumber: '555-123-9876',
        address: '789 Pine Road',
        age: 40,
        gender: 'Male',
        profileImg: 'https://via.placeholder.com/50'
      },
      {
        id: 4,
        firstName: 'Emily',
        lastName: 'White',
        phoneNumber: '222-333-4444',
        address: '101 Maple Lane',
        age: 35,
        gender: 'Female',
        profileImg: 'https://via.placeholder.com/50'
      }
    ];
  }

  // Method for navigating to patient details (if applicable)
  detailsID(patientId: number): void {
    this.router.navigate(['/patient/details', patientId]);  // Navigate to patient details page
  }

}
