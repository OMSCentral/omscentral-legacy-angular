import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'oms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oms';
  constructor(public router: Router) {

  }
}
