import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { ChatService } from './services/chat.service';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { ChatComponent } from './components/chat/chat.component';
import { ShopSettingsComponent } from './components/shop/settings/settings.component';
import { AddBookingComponent } from './components/users/bookings/add-bookings/add-bookings.component';
import { ViewBookingsComponent } from './components/users/bookings/view-bookings/view-bookings.component';
import { CalendarComponent } from './components/users/calendar/calendar.component';
import { UserSettingsComponent } from './components/users/settings/user-settings.component';



@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    WelcomeComponent,
    ViewBookingsComponent,
    CalendarComponent,
    AddBookingComponent,
    UserSettingsComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: WelcomeComponent},
      {path: 'donna', component: ChatComponent},
      {path: 'view-bookings', component: ViewBookingsComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'add-booking', component: AddBookingComponent},
      {path: 'set-hours', component: UserSettingsComponent},
    ])
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
