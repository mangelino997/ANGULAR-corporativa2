import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { FormGroup } from '@angular/forms';
import { Analysis } from 'src/app/modules/analysis';
import { TypeRehabilitationService } from 'src/app/services/type-rehabilitation.service';

@Component({
  selector: 'app-new-analysis',
  templateUrl: './new-analysis.component.html',
  styleUrls: ['./new-analysis.component.scss']
})
export class NewAnalysisComponent implements OnInit {
  //Define el formulario para la seccion Datos del Paciente
  public analysisForm: FormGroup;
  //Define la lista de tipos de rehabilitaciones
  public typesRehabilitations:Array<any> = [];
  //Define la fuente de la imagen que cargamos
  public imageSrc: any;
  //Define la imagen del sexo por defecto
  public sexSelectedImage:string = 'assets/female.png';
  //Constructor
  constructor(private appComponent: AppComponent, private analysisModule: Analysis,
    private typeRehabilitationService: TypeRehabilitationService) { }
  //Al inicializarse el componente
  ngOnInit() {
    //Establece el formulario analisis
    this.analysisForm = this.analysisModule.form;
    //Establece el nombre y matricula del usuario
    this.analysisForm.get('nameUser').setValue('Bravo Blas');
    this.analysisForm.get('enrollmentUser').setValue('AS343SD');
    //Obtiene la lista de tipos de rehabilitacion
    this.listTypeRehabilitation();
  }
  //Obtiene la lista de tipos de rehabilitaciones
  private listTypeRehabilitation(): void {
    this.typeRehabilitationService.list().subscribe(res => {
      this.typesRehabilitations = res.json();
    });
  }
  //Determina que analisis se va a procesar
  public stepChange(event) {
    switch (event.selectedIndex) {
      //Foto del paciente
      case 1:
        //Inicializa el sexo femenino por defecto
        this.sexSelected('card-female');
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
  //Metodo controlador del formulario2 (seleccion del Sexo del Paciente y carga de imagen). Primer parametro es la tarjeta que se activa, el segundo y el tercero boolean
  public sexSelected(card) {
    var cardSelected = document.getElementById(card);
    switch (card) {
      case 'card-male':
        this.analysisForm.get('patient').get('male').setValue(true);
        this.analysisForm.get('patient').get('female').setValue(false);
        cardSelected.className = "checkBoxCardSelected";
        document.getElementById('card-female').className = "mat-card";
        this.sexSelectedImage = 'assets/male.png';
        break;
      case 'card-female':
        this.analysisForm.get('patient').get('female').setValue(true);
        this.analysisForm.get('patient').get('male').setValue(false);
        cardSelected.className = "checkBoxCardSelected";
        document.getElementById('card-male').className = "mat-card";
        this.sexSelectedImage = 'assets/female.png';
        break;
      default:
        cardSelected.className = "checkBoxCardNotSelected";
        break;
    }
  }
  //Metodo cargar imagen
  public readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }
  //Funcion para comparar y mostrar elemento de campo select
  public compareFn = this.compararFn.bind(this);
  private compararFn(a, b) {
    if(a != null && b != null) {
      return a.id === b.id;
    }
  }
}