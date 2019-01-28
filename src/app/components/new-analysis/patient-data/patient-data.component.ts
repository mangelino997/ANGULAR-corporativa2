import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Analysis } from 'src/app/modules/analysis';
import { TypeRehabilitationService } from 'src/app/services/type-rehabilitation.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {
  //Define el evento que emite datos al componente padre
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario para la seccion Datos del Paciente
  public analysisForm:FormGroup;
  //Define la lista de tipos de rehabilitaciones
  public typesRehabilitations:Array<any> = [];
  //Constructor
  constructor(private analysisModule: Analysis, private typeRehabilitationService: TypeRehabilitationService,
    private appComponent: AppComponent) { }
  //Al inicializarse el componente
  ngOnInit() {
    //Establece el formulario analisis
    this.analysisForm = this.analysisModule.form;
    this.analysisForm.reset();
    //Defiene y establece el usuario logueado
    let user = this.appComponent.getUser();
    //Establece el nombre y matricula del usuario
    this.analysisForm.get('nameUser').setValue(user.name);
    this.analysisForm.get('enrollmentUser').setValue(user.enrollment);
    //Obtiene la lista de tipos de rehabilitacion
    this.listTypeRehabilitation();
    //Habilita los campos select
    this.analysisForm.get('typeRehabilitation').enable();
    this.analysisForm.get('type').enable();
    //Establece el foco en nombre
    setTimeout(function() {
      document.getElementById('idFirstname').focus();
    }, 20);
  }
  //Obtiene la lista de tipos de rehabilitaciones
  private listTypeRehabilitation(): void {
    this.typeRehabilitationService.list().subscribe(res => {
      this.typesRehabilitations = res.json();
    });
  }
  //Envia el formulario a componente padre Nuevo Analisis
  public sendData(): void {
    let user = {id:1};
    this.analysisForm.get('user').setValue(user);
    this.analysisForm.get('patient').get('user').setValue(user);
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