import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReceptionistService} from 'src/app/receptionist.service';
import {User} from 'src/app/_models/user';


@Component({
  selector: 'app-receptionist-delete',
  templateUrl: './receptionist-delete.component.html',
  styleUrls: ['./receptionist-delete.component.css']
})
export class ReceptionistDeleteComponent implements OnInit {

  dReceptionist!: User;

  constructor(private resSer: ReceptionistService, private router: Router, public ar: ActivatedRoute) {
  }

  ngOnInit(): void {
    (<any>$('#myModal')).modal('show');
    this.ar.params.subscribe(a => {
      this.resSer.getReceptionistById(a['id']).subscribe({
        next: a => {
          this.dReceptionist = a;
        }
      })
    })
  }

  delete() {
    this.ar.params.subscribe(a => {
      this.resSer.deleteReceptionist(a['id']).subscribe({
        next: a => {
          (<any>$('#myModal')).modal('hide');
          this.router.navigate(['/receptionists']);
        }
      })
    })
  }

  goBack() {
    this.router.navigate(['/receptionists']);
  }

}
