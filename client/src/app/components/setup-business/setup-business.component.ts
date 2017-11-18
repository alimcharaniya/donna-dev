import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'setup-business',
  templateUrl: './setup-business.component.html',
  providers: [BookingService]

})

export class SetupBusinessComponent {
  constructor(){

  }
  private newServices = [
    {
      name: "Haircut",
      time: 30
    }
  ]
  addNewServiceRow(){
    var a = {
      name: "new service",
      time: 100
    }
    this.newServices.push(a);
  }

  setupBusiness(setupBusinessForm: NgForm){
    //Start here. You enter this function on Submitting
    // var businessInfo = {
    //   fullName: setupBusinessForm.value.name
    //   email:
    //   number:
    //   address:
    // }

    console.log(setupBusinessForm.value.name);
    alert("Submitting business!");
  }

}
