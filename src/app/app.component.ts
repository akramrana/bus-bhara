import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ঢাকার-বাস ভাড়া';
  titleEn = 'Dhaka-Bus Fare';
  isShown:boolean=false;
}
