import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'add-bookings',
  templateUrl: './add-bookings.component.html',
  })

export class AddBookingComponent {
  title = 'app';

  constructor(){

  }

  addBooking(addBookingForm: NgForm){
    console.log(addBookingForm);

    console.log("New booking button pressed");
  }
}
