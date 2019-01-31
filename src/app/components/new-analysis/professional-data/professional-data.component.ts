import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-professional-data',
  templateUrl: './professional-data.component.html',
  styleUrls: ['./professional-data.component.scss']
})
export class ProfessionalDataComponent implements OnInit {
  //Define el evento que envia el formulario
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario para la seccion Datos del Paciente
  public professionalForm:FormGroup;
  //Constructor
  constructor() {}
  //Al iniciliazarse el componente
  ngOnInit() {
    //Crea el formulario
    this.professionalForm = new FormGroup({
      image: new FormControl()
    });
  }

}
