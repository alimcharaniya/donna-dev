import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {
  constructor(public afAuth: AngularFireAuth){
    console.log("Authenticatipn service started");
  }
}
