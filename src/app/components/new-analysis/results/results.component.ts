import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario para la seccion Datos del Paciente
  public results:FormGroup;
  //Define la imagen 
  public image1: any;
  public image2: any;
  public image3: any;
  public image4: any;

  constructor() {

   }

  ngOnInit() {
    //Crea el formulario
    this.results = new FormGroup({
      imagePhotography: new FormControl(),
      imageTeleradiography: new FormControl(),
      imageOrthopantomography: new FormControl(),
      imageCandilography: new FormControl()
    });
  }
  // Inicializa los resultados de los Análisis
  public initResults(imgAnalysis, analysis){
    switch(analysis){
      case 'photography':
        this.results.get('imagePhotography').setValue(imgAnalysis);
        break;
      case 'teleradiography':
        this.results.get('imageTeleradiography').setValue(imgAnalysis);
        break;
      case 'orthopantomography':
        this.results.get('imageOrthopantomography').setValue(imgAnalysis);
        break;
      case 'candilography':
        this.results.get('imageCandilography').setValue(imgAnalysis);
        break;
    }
  }

}
