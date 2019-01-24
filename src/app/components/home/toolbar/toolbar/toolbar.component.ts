import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  //Evento que envia los datos del formulario al componente padre
  @Output() dataEvent = new EventEmitter<any>();
  //Constructor
  constructor() { }
  //Al inicializarse el componente
  ngOnInit() {
  }
  //Recibe los datos del componente Toolbar-Profile
  public receiveData($event) {
    this.dataEvent.emit($event);
  }
}
