import { Component, Output, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //Define si se muestra el login o home
  public showLogin:boolean = true;
  //Define el usuario
  public user:any = null;
  //Constructor
  constructor(private router: Router) {
    this.router.navigate(['']);
  }
  //Obtiene el usuario
  public getUser() {
    return this.user;
  }
  //Establece el usuario
  public setUser(user): void {
    this.user = user;
  }
  //Obtiene si el usuario esta logueado
  public getLogged() {
    return this.showLogin;
  }
  //Recibe los datos del componente login
  public receiveDataFromLogin($event) {
    this.showLogin = $event ? false : true;
  }
  //Recibe los datos del componente sidenav
  public receiveDataFromSidenav($event) {
    this.showLogin = $event ? false : true;
  }
}