import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Analysis } from 'src/app/modules/analysis';
import { TypeRehabilitationService } from 'src/app/services/type-rehabilitation.service';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario para la seccion Datos del Paciente
  public analysisForm:FormGroup;
  //Define la lista de tipos de rehabilitaciones
  public typesRehabilitations:Array<any> = [];
  //Constructor
  constructor(private analysisModule: Analysis, private typeRehabilitationService: TypeRehabilitationService) { }
  //Al inicializarse el componente
  ngOnInit() {
    //Establece el formulario analisis
    this.analysisForm = this.analysisModule.form;
    //Establece el nombre y matricula del usuario
    this.analysisForm.get('nameUser').setValue('Bravo Blas');
    this.analysisForm.get('enrollmentUser').setValue('AS343SD');
    //Obtiene la lista de tipos de rehabilitacion
    this.listTypeRehabilitation();
  }
  //Obtiene la lista de tipos de rehabilitaciones
  private listTypeRehabilitation(): void {
    this.typeRehabilitationService.list().subscribe(res => {
      this.typesRehabilitations = res.json();
    });
  }
  //Envia el formulario a Nuevo Analisis
  public sendData(): void {
    this.dataEvent.emit(this.analysisForm);
  }
  //Funcion para comparar y mostrar elemento de campo select
  public compareFn = this.compararFn.bind(this);
  private compararFn(a, b) {
    if(a != null && b != null) {
      return a.id === b.id;
    }
  }
}