import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DoctorService} from 'src/app/doctor.service';
import {Doctor} from 'src/app/_models/doctor';


@Component({
  selector: 'app-doctor-delete',
  templateUrl: './doctor-delete.component.html',
  styleUrls: ['./doctor-delete.component.css']
})
export class DoctorDeleteComponent implements OnInit {

  dDoctor!: Doctor;

  constructor(private drSer: DoctorService, private router: Router, public ar: ActivatedRoute) {
  }

  ngOnInit(): void {
    (<any>$('#myModal')).modal('show');
    this.ar.params.subscribe(a => {
      //console.log(a['id']);
      this.drSer.getDoctorById(a['id']).subscribe({
        next: a => {
          this.dDoctor = a;
        }
      })
    })
  }

  delete() {
    this.ar.params.subscribe(a => {
      this.drSer.deleteDoctor(a['id']).subscribe({
        next: a => {
          (<any>$('#myModal')).modal('hide');
          this.router.navigate(['/doctors']);
        }
      })
    })
  }

  goBack() {
    this.router.navigate(['/doctors']);
  }

}
