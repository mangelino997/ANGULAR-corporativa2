import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnalysisService } from 'src/app/services/analysis.service';
import { Analysis } from 'src/app/modules/analysis';
import { TypeRehabilitationService } from 'src/app/services/type-rehabilitation.service';

@Component({
  selector: 'app-my-analysis',
  templateUrl: './my-analysis.component.html',
  styleUrls: ['./my-analysis.component.scss']
})
export class MyAnalysisComponent implements OnInit {
  //Define el formulario para la seccion Datos del Paciente
  public form: FormGroup;
  //Define el autocompletado como un formControl
  public autocomplete: FormControl = new FormControl();
  //Define la imagen de Analisis Fotografico
  public photographyImage:any = null;
  //Define la imagen de Analisis de la Teleradiografia
  public teleradiographyImage:any = null;
  //Define la imagen de Analisis de la Ortopantomografia
  public orthopantomographyImage:any = null;
  //Define la imagen de Analisis de la Condilografia
  public condylegraphyImage:any = null;
  //Define la lista de resultados de busqueda
  public results: Array<any> = [];
  //Define la lista de tipos de rehabilitaciones
  public typesRehabilitations:Array<any> = [];
  //Constructor
  constructor(private analysisService: AnalysisService, private analysisModule: Analysis,
    private typeRehabilitationService: TypeRehabilitationService) {}
  //Al inicializarse el componente
  ngOnInit() {
    //Establece el formulario analisis
    this.form = this.analysisModule.form;
    this.form.reset();
    this.form.get('nameUser').setValue(null);
    this.form.get('conclusion').setValue(null);
    this.form.get('prothesisCode').setValue(null);
    //Autocompletado - Buscar por alias
    this.autocomplete.valueChanges.subscribe(data => {
      if (typeof data == 'string') {
        this.analysisService.listByAlias(data).subscribe(res => {
          this.results = res.json();
        })
      }
    })
    //Obtiene la lista de tipos de rehabilitacion
    this.listTypeRehabilitation();
    //Establece los campo solo lectura por defecto
    this.setSelectReadonly();
    setTimeout(function() {
      document.getElementById('idAutocomplete').focus();
    }, 20);
  }
  //Establece los campos solo lectura
  private setSelectReadonly(): void {
    this.form.get('typeRehabilitation').disable();
    this.form.get('type').disable();
  }
  //Obtiene la lista de tipos de rehabilitaciones
  private listTypeRehabilitation(): void {
    this.typeRehabilitationService.list().subscribe(res => {
      this.typesRehabilitations = res.json();
    });
  }
  //Establece el formulario al seleccionar elemento del autocompletado
  public changeAutocomplete(element) {
    this.form.patchValue(element);
    this.form.get('nameUser').setValue(element.user.name);
    this.form.get('enrollmentUser').setValue(element.user.enrollment);
    this.photographyImage = atob(this.form.get('photographyImage').value.data);
    this.teleradiographyImage = atob(this.form.get('teleradiographyImage').value.data);
    this.orthopantomographyImage = atob(this.form.get('orthopantomographyImage').value.data);
    this.condylegraphyImage = atob(this.form.get('condylegraphyImage').value.data);
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
}