import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Table} from 'primeng/table';
import {ReceptionistService} from 'src/app/receptionist.service';
import {User} from 'src/app/_models/user';

@Component({
  selector: 'app-receptionist-list',
  templateUrl: './receptionist-list.component.html',
  styleUrls: ['./receptionist-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReceptionistListComponent implements OnInit {

  receptionists: User[] = [];

  loading: boolean = true;

  genders: any = [];

  constructor(private recSer: ReceptionistService, public router: Router) {
  }

  ngOnInit(): void {

    this.recSer.getAllReceptionists().subscribe({
      next: a => {
        this.receptionists = a;
        this.loading = false;
      }
    });

    this.genders = this.recSer.genders;

  }

  // delete
  delete(id: string) {
    this.router.navigate(['/receptionists/delete', id]);
  }

  // update
  edit(id: string) {
    this.router.navigate(['/receptionists/edit', id]);
  }

  // add
  add() {
    this.router.navigate(['/receptionists/add']);
  }

  // table
  clear(table: Table) {
    table.clear();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

}
