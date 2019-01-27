import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModuleService } from 'src/app/services/module.service';
import { Router } from '@angular/router';

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
  //Define el menu
  public menu:Array<any> = [];
  //Constructor
  constructor(private moduleService: ModuleService, private router: Router) {}
  //Al inicializar el componente
  ngOnInit() {
    //Obtiene el menu
    this.moduleService.getMenu(1).subscribe(res => {
      this.menu = res.json();
      console.log(this.menu);
    });
  }
  //Recibe los datos del componente Toolbar
  public receiveData($event) {
    this.sendData($event);
  }
  //Envia los datos al componente padre
  public sendData(state): void {
    this.dataEvent.emit(state);
  }
  //Navegacion
  public navigate(module, suboption): void {
    var p = module + suboption;
    var pag = p.toLowerCase();
    pag = pag.replace(new RegExp(/\s/g), "");
    pag = pag.replace(new RegExp(/[àá]/g), "a");
    pag = pag.replace(new RegExp(/[èé]/g), "e");
    pag = pag.replace(new RegExp(/[ìí]/g), "i");
    pag = pag.replace(new RegExp(/ñ/g), "n");
    pag = pag.replace(new RegExp(/[òó]/g), "o");
    pag = pag.replace(new RegExp(/[ùú]/g), "u");
    pag = pag.replace(new RegExp(/ /g), "");
    pag = pag.replace(new RegExp(/[-]/g), "");
    pag = pag.replace(new RegExp(/[,]/g), "");
    pag = pag.replace(new RegExp(/[.]/g), "");
    pag = pag.replace(new RegExp(/[/]/g), "");
    console.log(pag);
    // this.router.navigate([pag]);
  }
}
