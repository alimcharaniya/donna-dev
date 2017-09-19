import { Component } from '@angular/core';
import { Booking } from '../../models/booking';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'view-bookings',
  templateUrl: './view-bookings.component.html',
})
export class ViewBookingsComponent {
  items: FirebaseListObservable<any[]>;


  constructor(private db: AngularFireDatabase){
    this.items = db.list('/bookings');
  }

  editUser(user){
    console.log("EDITING: " + user.name);
  }
  title = 'app';
}
