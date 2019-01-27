import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-patient-radiography',
  templateUrl: './patient-radiography.component.html',
  styleUrls: ['./patient-radiography.component.scss']
})
export class PatientRadiographyComponent implements OnInit {
  //Define el evento que envia el formulario
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario
  public radiographyForm:FormGroup;
  //Define la imagen de orthopantomography
  public orthopantomographyImage:string;
  //Define la imagen de teleradiography
  public teleradiographyImage:string;
  //Define la imagen de condilography
  public condilographyImage:string;
  //Constructor
  constructor(private appService: AppService) {}
  //Al inicializarse el componente
  ngOnInit() {
    //Establece la teleradiografia
    this.teleradiographyImage = this.appService.getUrlBase() + '/indicativeImage/getById/3';
    //Establece la ortopantomografia
    this.orthopantomographyImage = this.appService.getUrlBase() + '/indicativeImage/getById/4';
    //Establece la condilografia
    this.condilographyImage = this.appService.getUrlBase() + '/indicativeImage/getById/5';
    //Crea el formulario
    this.radiographyForm = new FormGroup({
      imageOrthopantomography: new FormControl(),
      imageTeleradiography: new FormControl(),
      imageCondilography: new FormControl(),
    });
  }
  //Envia el formulario a Nuevo Analisis
  public sendDataPR(): void {
    this.dataEvent.emit(this.radiographyForm.value);
  }
  //Metodo cargar imagen
  public readURL(event, image): void {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let reader = new FileReader();
      switch(image) {
        case 1:
          reader.onload = e => this.radiographyForm.get('imageOrthopantomography').setValue(reader.result);
          reader.readAsDataURL(file);
          break;
        case 2:
          reader.onload = e => this.radiographyForm.get('imageTeleradiography').setValue(reader.result);
          reader.readAsDataURL(file);
          break;
        case 3:
          reader.onload = e => this.radiographyForm.get('imageCondilography').setValue(reader.result);
          reader.readAsDataURL(file);
          break;
      }
    }
  }
}