import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AnalysisPhotographyComponent } from './analysis-photography/analysis-photography.component';
import { PatientPhotoComponent } from './patient-photo/patient-photo.component';
import { AnalysisTeleradiographyComponent } from './analysis-teleradiography/analysis-teleradiography.component';
import { AnalysisOrthopantographyComponent } from './analysis-orthopantography/analysis-orthopantography.component';

@Component({
  selector: 'app-new-analysis',
  templateUrl: './new-analysis.component.html',
  styleUrls: ['./new-analysis.component.scss']
})
export class NewAnalysisComponent implements OnInit {
  //Define el componente Analisis Fotografico
  @ViewChild(AnalysisPhotographyComponent) apComponent;
  //Define el componente Analisis Fotografico
  @ViewChild(AnalysisOrthopantographyComponent) aoComponent;
  //Define el componente Foto del Paciente
  @ViewChild(PatientPhotoComponent) ppComponent;
  //Define el componente Radiografias del Paciente
  @ViewChild(AnalysisTeleradiographyComponent) arComponent;
  //Define el formulario para la seccion Datos del Paciente
  public analysisForm: FormGroup;
  //Define el formulario para la seccion Foto del Paciente
  public patientPhotoForm: FormGroup;
  //Define el formulario para la seccion Radiografías del Paciente
  public teleradiographyForm: FormGroup;
  
  //Define el formulario para la seccion Analisis Telerradiografia
  public atForm:FormGroup;
  //Constructor
  constructor() { }
  //Al inicializarse el componente
  ngOnInit() {
    //Inicializa el formulario de datos del paciente
    this.analysisForm = new FormGroup({});
    //Inicializa el formulario de foto del paciente
    this.patientPhotoForm = new FormGroup({});
    //Inicializa el formulario del analisis fotografico
    this.teleradiographyForm = new FormGroup({});
    //Inicializa el formulario para radiografías del paciente
    this.atForm = new FormGroup({});
  }
  //Recibe el formulario del paciente
  public receivePatientData($event): void {
    this.analysisForm = $event;
    this.ppComponent.sexSelected('card-female');
  }
  //Recibe la foto del paciente
  public receivePatientPhoto($event): void {
    let patientPhotoForm = $event;
    let sex = patientPhotoForm.female ? {id: 1} : {id: 2};
    this.analysisForm.get('patient').get('sex').setValue(sex);
    this.analysisForm.get('patient').get('image').setValue(patientPhotoForm.image);
    this.apComponent.initCanvas(patientPhotoForm.image);
    this.apComponent.setIndicativeImage(patientPhotoForm.indicativeImage);
  }
  //Recibe el formulario de Radiografias
  public receiveRadiography($event): void {
    let radiographyPhotos= $event;
    console.log(radiographyPhotos);
    //Setea la imagen en el canvas de Telerradiografia
    this.arComponent.initCanvas(radiographyPhotos.imageTeleradiography);
    this.arComponent.setIndicativeImage(radiographyPhotos.indicativeImage);
    //Setea la imagen en el canvas de Ortopantografia
    this.aoComponent.initCanvas(radiographyPhotos.imageOrthopantomography);
    this.aoComponent.setIndicativeImage(radiographyPhotos.indicativeImage);
  }
  
  //
  //Determina que analisis se va a procesar
  public stepChange(event) {
    switch (event.selectedIndex) {
      //Foto del paciente
      case 1:
        
        break;
      //Analisis Fotografico
      case 2:
        
        break;
      //Analisis de la Telerradiografia
      case 4:
        
        break;
      //Analisis de la Ortopantomografia
      case 5:
        
        break;
      //Analisis de la Condilografia
      case 6:
        
        break;
    }
  }
}