import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-toolbar-profile',
  templateUrl: './toolbar-profile.component.html',
  styleUrls: ['./toolbar-profile.component.scss']
})
export class ToolbarProfileComponent implements OnInit {
  //Evento que envia los datos del formulario al componente padre
  @Output() dataEvent = new EventEmitter<any>();
  //Define el usuario
  public user:any = null;
  //Constructor
  constructor(private appComponent: AppComponent) { }
  //Al inicializarse el componente
  ngOnInit() {
    //Establece el usuario
    this.user = this.appComponent.getUser();
  }
  //Envia los datos al componente padre
  public sendData(state): void {
    this.dataEvent.emit(state);
  }
  //Logout
  public logout(): void {
    this.sendData(false);
  }
}
