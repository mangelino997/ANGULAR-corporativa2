import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-patient-photo',
  templateUrl: './patient-photo.component.html',
  styleUrls: ['./patient-photo.component.scss']
})
export class PatientPhotoComponent implements OnInit {
  //Define el evento que envia el formulario
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario
  public patientPhotoForm:FormGroup;
  //Define la imagen del sexo por defecto
  public sexSelectedImage:string;
  //Define la imagen para mujer
  public femaleImage:string;
  //Define la imagen para hombre
  public maleImage:string;
  //Constructor
  constructor(private appService: AppService) { }
  //Al inicializarse el componente
  ngOnInit() {
    //Establece la imagen de mujer
    this.femaleImage = this.appService.getUrlBase() + '/indicativeImage/getById/1';
    //Establece la imagen de hombre
    this.maleImage = this.appService.getUrlBase() + '/indicativeImage/getById/2';
    //Establece la imagen por defecto en imagen real del paciente
    this.sexSelectedImage = this.femaleImage;
    //Crea el formulario
    this.patientPhotoForm = new FormGroup({
      female: new FormControl(),
      male: new FormControl(),
      image: new FormControl(),
      indicativeImage: new FormControl()
    });
  }
  //Envia el formulario a Nuevo Analisis
  public sendData(): void {
    this.patientPhotoForm.get('indicativeImage').setValue(this.sexSelectedImage);
    this.dataEvent.emit(this.patientPhotoForm.value);
  }
  //Determina la seleccion del sexo del paciente
  public sexSelected(card) {
    var cardSelected = document.getElementById(card);
    switch (card) {
      case 'card-male':
        this.patientPhotoForm.get('male').setValue(true);
        this.patientPhotoForm.get('female').setValue(false);
        cardSelected.className = "checkBoxCardSelected";
        document.getElementById('card-female').className = "mat-card";
        this.sexSelectedImage = this.maleImage;
        break;
      case 'card-female':
        this.patientPhotoForm.get('female').setValue(true);
        this.patientPhotoForm.get('male').setValue(false);
        cardSelected.className = "checkBoxCardSelected";
        document.getElementById('card-male').className = "mat-card";
        this.sexSelectedImage = this.femaleImage;
        break;
      default:
        cardSelected.className = "checkBoxCardNotSelected";
        break;
    }
  }
  //Carga la imagen del paciente
  public readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.patientPhotoForm.get('image').setValue(reader.result);
      reader.readAsDataURL(file);
    }
  }
}
