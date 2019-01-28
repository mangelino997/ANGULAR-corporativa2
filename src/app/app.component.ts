import { Component, Output, EventEmitter } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //Define si se muestra el login o home
  public showLogin:boolean = true;
  //Constructor
  constructor() {}
  //Recibe los datos del componente login
  public receiveDataFromLogin($event) {
    this.showLogin = $event ? false : true;
  }
  //Recibe los datos del componente sidenav
  public receiveDataFromSidenav($event) {
    this.showLogin = $event ? false : true;
    console.log($event);

  }
}