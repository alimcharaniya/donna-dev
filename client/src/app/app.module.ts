import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { ChatService } from './services/chat.service';
import { BookingService } from './services/booking.service';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';


import { ChatComponent } from './components/bot/chat.component';
import { ShopSettingsComponent } from './components/shop/settings/settings.component';
import { AddBookingComponent } from './components/add-bookings/add-bookings.component';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UserSettingsComponent } from './components/settings/user-settings.component';
import { SetupBusinessComponent } from './components/setup-business/setup-business.component';

export const firebaseConfig = {
    apiKey: "AIzaSyBIZGG_U1xvqwO9h892zVhzbFZhqgZe1as",
    authDomain: "donna-60361.firebaseapp.com",
    databaseURL: "https://donna-60361.firebaseio.com",
    storageBucket: "donna-60361.appspot.com",
    messagingSenderId: "1070134236763"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    WelcomeComponent,
    ViewBookingsComponent,
    CalendarComponent,
    AddBookingComponent,
    UserSettingsComponent,
    SetupBusinessComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: WelcomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'donna', component: ChatComponent},
      {path: 'view-bookings', component: ViewBookingsComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'add-booking', component: AddBookingComponent},
      {path: 'set-hours', component: UserSettingsComponent},
      {path: 'setup-business', component: SetupBusinessComponent}

    ])
  ],
  providers: [ChatService, BookingService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
