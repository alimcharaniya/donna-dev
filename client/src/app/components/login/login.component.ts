import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [],
  styleUrls:['./login.component.css']

})

export class LoginComponent {
  constructor(){
    console.log("booking component started");
  }


}
