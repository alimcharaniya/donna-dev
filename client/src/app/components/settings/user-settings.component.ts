import { Component } from '@angular/core';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
})
export class UserSettingsComponent {
  title = 'app';
  private names = ["Akshey", "Di", "Alim"];  
}
