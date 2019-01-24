import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  //Evento que envia los datos del formulario al componente padre
  @Output() dataEvent = new EventEmitter<any>();
  //Establece el sidenav como abierto por defecto
  public opened:boolean = true;
  //Constructor
  constructor() {}
  //Al inicializar el componente
  ngOnInit() {
    
  }
  //Recibe los datos del componente Toolbar
  public receiveData($event) {
    this.sendData($event);
  }
  //Envia los datos al componente padre
  public sendData(state): void {
    this.dataEvent.emit(state);
  }
}
