import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { AfImageGifService } from 'src/app/services/af-image-gif.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-patient-radiography',
  templateUrl: './patient-radiography.component.html',
  styleUrls: ['./patient-radiography.component.scss']
})
export class PatientRadiographyComponent implements OnInit {
  //Define el formulario
  public rpForm:FormGroup;
  //Define si el segundo <img> en subir imagen se muestra o no
  public muestraImagenPc: boolean = true;
  //Definimos la variable donde guardaremos la foto
  public archivo: File = null;
  //id del indice seleccionado
  public selectedIndex: number = null;
  //Define las fuentes de la imagens que cargamos 
  public imageSrcProfile: any;
  public imageSrcCraneo: any;
  public imageSrcOrthopantomography: any;
  public imageSrcTeleradiography: any;
  public imageSrcCondilography: any;

  constructor() { }

  ngOnInit() {
    //Establece el formulario
    this.rpForm = new FormGroup({});
  }

  //Metodo cargar imagen
  public readURL(event, src): void {
    console.log(src);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      switch(src){
        case 'imageSrcProfile':
        console.log(event);
          reader.onload = e => this.imageSrcProfile = reader.result;
          reader.readAsDataURL(file);
          break;
        case 'imageSrcCraneo':
          console.log(event);
          reader.onload = e => this.imageSrcCraneo = reader.result;
          reader.readAsDataURL(file);
          break;
        case "imageSrcOrthopantomography":
          console.log("entra en ortopa");
          reader.onload = e => this.imageSrcOrthopantomography = reader.result;
          reader.readAsDataURL(file);
          break;
        case 'imageSrcTeleradiography':
          console.log("entra en tele");
          reader.onload = e => this.imageSrcTeleradiography = reader.result;
          reader.readAsDataURL(file);
          break;
        case 'imageSrcCondilography':
          reader.onload = e => this.imageSrcCondilography = reader.result;
          reader.readAsDataURL(file);
          break;
      }
    }
  }
}
