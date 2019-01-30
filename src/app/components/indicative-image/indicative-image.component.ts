import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IndicativeImageService } from 'src/app/services/indicative-image.service';
import { TypeAnalysisService } from 'src/app/services/type-analysis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-indicative-image',
  templateUrl: './indicative-image.component.html',
  styleUrls: ['./indicative-image.component.scss']
})
export class IndicativeImageComponent implements OnInit {
  //Define el formulario
  public indicativeImageForm: FormGroup;
  //Define la lista de tipos de analisis
  public typesAnalysis: Array<any> = [];
  //Constructor
  constructor(private toast: ToastrService, private indicativeImageService: IndicativeImageService, private typeAnalysisService: TypeAnalysisService) { }
  //Al inicializarse el componente
  ngOnInit() {
    //Inicializa el Formulario
    this.indicativeImageForm = new FormGroup({
      idTypeAnalysis: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
    //Carga el select con los tipos de analisis
    this.initTypeAnalysis();
    //Establece valores por defecto
    this.setDefaultValues();
  }
  //Establece valores por defecto
  private setDefaultValues(): void {
    //Crea un json img vacio
    let img = { name: null, data: null };
    //Establece el json vacio a imagen
    this.indicativeImageForm.get('image').setValue(img);
  }
  //
  public initTypeAnalysis() {
    this.typeAnalysisService.list().subscribe(res => {
      this.typesAnalysis = res.json();
    });
  }
  //Carga la imagen del paciente
  public readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        let image = {
          name: file.name,
          data: reader.result
        }
        this.indicativeImageForm.get('image').setValue(image);
      }
      reader.readAsDataURL(file);
    }
  }
  //Guarda en la Base de Datos
  public save() {
    this.indicativeImageService.add(this.indicativeImageForm.value.image, this.indicativeImageForm.get('idTypeAnalysis').value.id).subscribe(res => {
      this.toast.success("Agregado con exito");
      this.reestablishForm();
    },
      err => {
        this.toast.success("Error al agregar la Imagen");
      });
  }
  //Formatea el valor del autocompletado
  public displayFn(element) {
    if (element != undefined) {
      return element.alias ? element.alias : element;
    } else {
      return element;
    }
  }
  //Funcion para comparar y mostrar elemento de campo select
  public compareFn = this.cFn.bind(this);
  private cFn(a, b) {
    if (a != null && b != null) {
      return a.id === b.id;
    }
  }
  //Reestablece los campos formularios
  private reestablishForm() {
    this.indicativeImageForm.reset();
    this.setDefaultValues();
  }
}