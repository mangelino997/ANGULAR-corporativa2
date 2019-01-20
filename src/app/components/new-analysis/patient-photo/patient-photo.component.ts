import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  public sexSelectedImage:string = 'assets/female.png';
  //Constructor
  constructor() { }
  //Al inicializarse el componente
  ngOnInit() {
    //Crea el formulario
    this.patientPhotoForm = new FormGroup({
      female: new FormControl(),
      male: new FormControl(),
      image: new FormControl()
    });
  }
  //Envia el formulario a Nuevo Analisis
  public sendData(): void {
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
        this.sexSelectedImage = 'assets/male.png';
        break;
      case 'card-female':
        this.patientPhotoForm.get('female').setValue(true);
        this.patientPhotoForm.get('male').setValue(false);
        cardSelected.className = "checkBoxCardSelected";
        document.getElementById('card-male').className = "mat-card";
        this.sexSelectedImage = 'assets/female.png';
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
