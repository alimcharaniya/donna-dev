import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingService {
  constructor(private http:Http){
    console.log("Booking service started");
  }

  addNewBooking(newBooking){
    var headers = new Headers();
    return this.http.post('http://localhost:3000/bookings', newBooking, {headers: headers})
    .map(res => res);
  }

  getBookings(){
    var headers = new Headers();
    return this.http.get('http://localhost:3000/bookings', {headers: headers})
    .map(res => res);
  }
}
