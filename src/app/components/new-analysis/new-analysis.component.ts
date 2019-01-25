import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AnalysisPhotographyComponent } from './analysis-photography/analysis-photography.component';
import { PatientPhotoComponent } from './patient-photo/patient-photo.component';
import { AnalysisTeleradiographyComponent } from './analysis-teleradiography/analysis-teleradiography.component';
import { AnalysisOrthopantographyComponent } from './analysis-orthopantography/analysis-orthopantography.component';
import { AnalysisCandilographyComponent } from './analysis-candilography/analysis-candilography.component';
import { ResultsComponent } from './results/results.component';
import { PatientDataComponent } from './patient-data/patient-data.component';

@Component({
  selector: 'app-new-analysis',
  templateUrl: './new-analysis.component.html',
  styleUrls: ['./new-analysis.component.scss']
})
export class NewAnalysisComponent implements OnInit {
  //Define el componente Datos del Paciente
  @ViewChild(PatientDataComponent) dpComponent;
  //Define el componente Analisis Fotografico
  @ViewChild(AnalysisPhotographyComponent) apComponent;
  //Define el componente Analisis Fotografico
  @ViewChild(AnalysisOrthopantographyComponent) aoComponent;
  //Define el componente Analisis Candilografía
  @ViewChild(AnalysisCandilographyComponent) acComponent;
  //Define el componente Foto del Paciente
  @ViewChild(PatientPhotoComponent) ppComponent;
  //Define el componente Radiografias del Paciente
  @ViewChild(AnalysisTeleradiographyComponent) atComponent;
  //Define el componente Resultados
  @ViewChild(ResultsComponent) resultsComponent;
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
    this.resultsComponent.receiveData(this.analysisForm.value);
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
    this.atComponent.initCanvas(radiographyPhotos.imageTeleradiography);
    this.atComponent.setIndicativeImage(radiographyPhotos.indicativeImage);
    //Setea la imagen en el canvas de Ortopantomografia
    this.aoComponent.initCanvas(radiographyPhotos.imageOrthopantomography);
    this.aoComponent.setIndicativeImage(radiographyPhotos.indicativeImage);
    //Setea la imagen en el canvas de Candilografia
    this.acComponent.initCanvas(radiographyPhotos.imageCondilography);
    this.acComponent.setIndicativeImage(radiographyPhotos.indicativeImage);
  }
  // Recibe el formulario del Analisis Fotográfico
  public receiveAP($event){
    let resultAP= $event;
    this.resultsComponent.initResults(resultAP , 'photography'); 
  }
  // Recibe el formulario del Analisis Telerradiografia
  public receiveAT($event){
    let resultAT= $event;
    this.resultsComponent.initResults(resultAT , 'teleradiography');  
  }
  // Recibe el formulario del Analisis Ortopantomografia
  public receiveAO($event){
    let resultAO= $event;
    this.resultsComponent.initResults(resultAO , 'orthopantomography');
  }
  // Recibe el formulario del Analisis Candilografia
  public receiveAC($event){
    let resultAC= $event;
    this.resultsComponent.initResults(resultAC , 'condylegraphy');
  }
  // Recibe el formulario de los datos del Profesional
  public receiveProfessionalData($event){

  }
  
  //
  //Determina que analisis se va a procesar
  // public stepChange(event) {
  //   switch (event.selectedIndex) {
  //     //Datos del Paciente
  //     case 1: 
  //       this.dpComponent.sendData();
  //       break;
  //     //Foto del paciente
  //     case 2:
  //       this.ppComponent.sendData();
  //       break;
  //     //Analisis Fotografico
  //     case 3:
  //       this.apComponent.sendDataAP();
  //       console.log("entra");
  //       break;
  //     //Analisis de la Telerradiografia
  //     case 5:
  //       this.atComponent.sendDataAT();
  //       break;
  //     //Analisis de la Ortopantomografia
  //     case 6:
  //       this.aoComponent.sendDataAO();
  //       break;
  //     //Analisis de la Condilografia
  //     case 7:
  //       this.acComponent.sendDataAC();
  //       break;
  //   }
  // }
}