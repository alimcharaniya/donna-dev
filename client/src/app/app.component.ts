import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<div *ngIf="afAuth.authState | async; let user; else showLogin"><h1>Hello {{ user.displayName }}!</h1><button (click)="logout()">Logout</button></div><ng-template #showLogin><p>Please login.</p><button (click)="login()">Login with Google</button></ng-template><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private afAuth: AngularFireAuth, private sf: AuthService) {
    console.log("Initialized");
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  user = null;
  title = 'app';

}
