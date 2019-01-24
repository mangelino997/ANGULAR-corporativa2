import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar-profile',
  templateUrl: './toolbar-profile.component.html',
  styleUrls: ['./toolbar-profile.component.scss']
})
export class ToolbarProfileComponent implements OnInit {
  //Evento que envia los datos del formulario al componente padre
  @Output() dataEvent = new EventEmitter<any>();
  //Constructor
  constructor() { }
  //Al inicializarse el componente
  ngOnInit() {
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
