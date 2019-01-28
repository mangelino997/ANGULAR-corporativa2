import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnalysisService } from 'src/app/services/analysis.service';
import { Analysis } from 'src/app/modules/analysis';
import { CondylegraphyImageService } from 'src/app/services/condylegraphy-image.service';

@Component({
  selector: 'app-my-analysis',
  templateUrl: './my-analysis.component.html',
  styleUrls: ['./my-analysis.component.scss']
})
export class MyAnalysisComponent implements OnInit {
  //Define el formulario para la seccion Datos del Paciente
  public form:FormGroup;
  // define el autocompletado como un formControl
  public autocompletado: FormControl=new FormControl();
  //Define la lista de resultados de busqueda
  public resultados:Array<any> = [];
  constructor(private analysisService: AnalysisService, private analysisModule: Analysis, private condylegraphyImageService: CondylegraphyImageService) {
    this.autocompletado.valueChanges.subscribe(data => {
      if(typeof data == 'string') {
        this.analysisService.listByAlias(data).subscribe(res => {
          console.log(res.json());
          this.resultados=res.json();
        })
      }
    })
   }

  ngOnInit() {
    //Establece el formulario analisis
    this.form = this.analysisModule.form;
    this.form.reset();
    this.form.get('nameUser').patchValue({
      name: null
    });
    this.form.get('conclusion').patchValue(null);
    this.form.get('prothesisCode').patchValue(null);

    this.form.get('condylegraphyImage').patchValue(null);
  }
  public mostrar(){
    console.log(this.form.value);
  }
  //Establece el formulario al seleccionar elemento del autocompletado
  public cambioAutocompletado(elemento) {
    // this.form.patchValue(elemento);
    this.form.patchValue(elemento);
    this.form.get('nameUser').setValue(elemento.user.name);
    this.form.get('enrollmentUser').setValue(elemento.user.enrollment);
    console.log(elemento.condylegraphyImage.id);

    this.condylegraphyImageService.getById(elemento.condylegraphyImage.id).subscribe(res=>{
      var respuesta=res.text();
      console.log(respuesta);
      this.form.get('condylegraphyImage').setValue(respuesta);
    })
    // this.form.get('condylegraphyImage').setValue('src/data:'+elemento.condylegraphyImage.data);

    console.log(this.form.value);
  }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if(elemento != undefined) {
      return elemento.alias ? elemento.alias : elemento;
    } else {
      return elemento;
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
