import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {DoctorService} from 'src/app/doctor.service';
import {Doctor} from 'src/app/_models/doctor';


@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[] = [];

  loading: boolean = true;

  genders: any = [];
  specialities: any = [];

  imgurl: any;

  constructor(private drSer: DoctorService, public router: Router) {
  }

  ngOnInit(): void {
    this.drSer.getAllDoctors().subscribe({
      next: a => {
        this.doctors = a;
        this.loading = false;
        console.log(this.doctors)
      }
    });

    this.genders = this.drSer.genders;

    this.specialities = this.drSer.specialities;

  }

  // delete
  delete(id: string) {
    this.router.navigate(['/doctors/delete', id]);
  }

  // update
  edit(id: string) {
    this.router.navigate(['/doctors/edit', id]);
  }

  // add
  add() {
    this.router.navigate(['/doctors/add']);
  }

  // table
  clear(table: Table) {
    table.clear();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

}
