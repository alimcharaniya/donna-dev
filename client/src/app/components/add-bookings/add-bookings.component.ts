import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Booking } from '../../models/booking';

import { BookingService } from '../../services/booking.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'add-bookings',
  templateUrl: './add-bookings.component.html',
  providers: [BookingService]

})
export class AddBookingComponent {
  constructor(private af: AngularFireDatabase){

  }
  private showAlim: boolean = false;

  fireTest(){
      this.showAlim = true;
  }

  addBooking(addBookingForm: NgForm){
    var newBooking = {
      name : addBookingForm.value.name,
      phone : addBookingForm.value.phonenumber,
      email : addBookingForm.value.email,
      service : addBookingForm.value.serviceselection,
      attendant : addBookingForm.value.attendantselection,
      date : addBookingForm.value.dateselection,
      time : addBookingForm.value.timeselect,
      note : addBookingForm.value.notes
    }
    console.log("New booking added");
    this.af.list('bookings').push(newBooking);
    addBookingForm.resetForm();
  }
}
