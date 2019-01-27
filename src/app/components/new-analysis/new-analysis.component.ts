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
  //Define el formulario para la seccion Analisis Fotografico
  public apForm:FormGroup;
  //Define el formulario para la seccion Radiografias
  public radiographyForm: FormGroup;
  //Define el formulario para la seccion Analisis Telerradiografia
  public atForm:FormGroup;
  //Define el formulario para la seccion Analisis Ortopantomografia
  public aoForm:FormGroup;
  //Define el formulario para la seccion Analisis Condilografia
  public acForm:FormGroup;
  //Define el formulario para la seccion Datos del Profesional
  public professionalForm:FormGroup;
  //Define el formulario para la seccion Resultados
  public resultsForm:FormGroup;
  //Constructor
  constructor() { }
  //Al inicializarse el componente
  ngOnInit() {
    //Inicializa el formulario de datos del paciente
    this.analysisForm = new FormGroup({});
    //Inicializa el formulario de foto del paciente
    this.patientPhotoForm = new FormGroup({});
    //Inicializa el formulario para analisis fotografico
    this.apForm = new FormGroup({});
    //Inicializa el formulario para radiografías del paciente
    this.radiographyForm = new FormGroup({});
    //Inicializa el formulario para analisis de la teleradiografia
    this.atForm = new FormGroup({});
    //Inicializa el formulario para analisis de la ortopantomografia
    this.aoForm = new FormGroup({});
    //Inicializa el formulario para analisis de la condilografia
    this.acForm = new FormGroup({});
    //Inicializa el formulario para datos del profesional
    this.professionalForm = new FormGroup({});
    //Inicializa el formulario para resultados
    this.resultsForm = new FormGroup({});
  }
  //Recibe el formulario del paciente
  public receivePatientData($event): void {
    this.analysisForm = $event;
    this.ppComponent.sexSelected('card-female');
    this.resultsComponent.setAnalysis(this.analysisForm.value);
  }
  //Recibe la foto del paciente
  public receivePatientPhoto($event): void {
    let patientPhotoForm = $event;
    let sex = patientPhotoForm.female ? {id: 1} : {id: 2};
    this.analysisForm.get('patient').get('sex').setValue(sex);
    // this.analysisForm.get('patient').get('image').setValue(patientPhotoForm.image);
    this.apComponent.initCanvas(patientPhotoForm.image);
    this.apComponent.setIndicativeImage(patientPhotoForm.indicativeImage);
    this.resultsComponent.initResults(patientPhotoForm.image, 'patientImage');
  }
  //Recibe el formulario del Analisis Fotográfico
  public receiveAP($event){
    this.resultsComponent.initResults($event, 'photography');
  }
  //Recibe el formulario de Radiografias
  public receiveRadiography($event): void {
    let radiographyPhotos= $event;
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
  //Recibe el formulario del Analisis Telerradiografia
  public receiveAT($event){
    this.resultsComponent.initResults($event, 'teleradiography');  
  }
  //Recibe el formulario del Analisis Ortopantomografia
  public receiveAO($event){
    this.resultsComponent.initResults($event, 'orthopantomography');
  }
  //Recibe el formulario del Analisis Candilografia
  public receiveAC($event){
    this.resultsComponent.initResults($event, 'condylegraphy');
  }
  //Recibe el formulario de los datos del Profesional
  public receiveProfessionalData($event){

  }
}