import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { PatientRadiography } from 'src/app/modules/patient-radiography';
import { IndicativeImageService } from 'src/app/services/indicative-image.service';

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
  public orthopantomographyImage:any = null;
  //Define la imagen de teleradiography
  public teleradiographyImage:any = null;
  //Define la imagen de condilography
  public condilographyImage:any = null;
  //Define la bandera, si ya se activo el evento para evitar que se dupliquen los eventos y los puntos
  public flagEvent:boolean = false;
  //Constructor
  constructor(private pr: PatientRadiography, private appService: AppService, private indicativeImageService: IndicativeImageService) {}
  //Al inicializarse el componente
  ngOnInit() {
    //Establece la teleradiografia
    this.indicativeImageService.getById(3).subscribe(res=>{
      var data= res.json();
      this.teleradiographyImage = atob(data.data);
    });
    //Establece la ortopantomografia
    this.indicativeImageService.getById(4).subscribe(res=>{
      var data= res.json();
      this.orthopantomographyImage = atob(data.data);
    });
    //Establece la condilografia
    this.indicativeImageService.getById(5).subscribe(res=>{
      var data= res.json();
      this.condilographyImage = atob(data.data);
    });
    //Crea el formulario
    this.radiographyForm = this.pr.form;
  }
  //Envia el formulario a Nuevo Analisis
  public sendDataPR(): void {
    this.dataEvent.emit(this.radiographyForm.value);
    this.flagEvent=true;

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