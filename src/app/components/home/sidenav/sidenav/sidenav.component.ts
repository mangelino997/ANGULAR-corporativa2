import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  //Establece el sidenav como abierto por defecto
  public opened:boolean = true;
  //Constructor
  constructor() {}
  //Al inicializar el componente
  ngOnInit() {
    
  }
}
