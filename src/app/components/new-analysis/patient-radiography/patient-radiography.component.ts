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
  constructor(private appService: AppService) {

   }
  //Al inicializarse el componente
  ngOnInit() {
    //Establece la imagen de mujer
    this.orthopantomographyImage = this.appService.getUrlBase() + '/indicativeImage/getById/4';
    //Establece la imagen de hombre
    this.teleradiographyImage = this.appService.getUrlBase() + '/indicativeImage/getById/3';
    //Establece la imagen por defecto en imagen real del paciente
    this.condilographyImage = this.appService.getUrlBase() + '/indicativeImage/getById/5';
    //Establece el formulario
    this.radiographyForm = new FormGroup({});
    //Crea el formulario
    this.radiographyForm = new FormGroup({
      imageOrthopantomography: new FormControl(''),
      imageTeleradiography: new FormControl(''),
      imageCondilography: new FormControl(''),
    });
  }
  //Envia el formulario a Nuevo Analisis
  public sendDataPR(): void {
    this.dataEvent.emit(this.radiographyForm.value);
  }

  //Metodo cargar imagen
  public readURL(event, src): void {
    console.log(src);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      switch(src){
        case "imageSrcOrthopantomography":
          reader.onload = e => this.radiographyForm.get('imageOrthopantomography').setValue(reader.result);
          reader.readAsDataURL(file);
          break;
        case 'imageSrcTeleradiography':
          console.log("entra en tele");
          reader.onload = e => this.radiographyForm.get('imageTeleradiography').setValue(reader.result);
          reader.readAsDataURL(file);
          break;
        case 'imageSrcCondilography':
          reader.onload = e => this.radiographyForm.get('imageCondilography').setValue(reader.result);
          reader.readAsDataURL(file);
          break;
      }
    }
  }
}
