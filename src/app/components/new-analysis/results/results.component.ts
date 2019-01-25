import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Analysis } from 'src/app/modules/analysis';
import { PhotographyImageService } from 'src/app/services/photography-image.service';
import { TeleradiographyImageService } from 'src/app/services/teleradiography-image.service';
import { OrthopantomographyImageService } from 'src/app/services/orthopantomography-image.service';
import { CondylegraphyImageService } from 'src/app/services/condylegraphy-image.service';
import { DateService } from 'src/app/services/date.service';
import { ToastrService } from 'ngx-toastr';
import { AnalysisService } from 'src/app/services/analysis.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario Resultados (imagenes de los canvas trazados)
  public results:FormGroup;
  //Define el formulario para la seccion Datos del Paciente
  public form:FormGroup;
  // Declara la fecha actual
  public date: string=null;

  constructor(
    private analysisForm: Analysis, 
    private photographyService: PhotographyImageService, 
    private teleradiographyService: TeleradiographyImageService,
    private orthopantomographyService: OrthopantomographyImageService, 
    private condylegraphyService: CondylegraphyImageService,
    private dateService: DateService,
    private analysisService: AnalysisService) {

   }

  ngOnInit() {
    
    //Crea el formulario
    this.results = new FormGroup({
      imagePhotography: new FormControl(),
      imageTeleradiography: new FormControl(),
      imageOrthopantomography: new FormControl(),
      imageCondylegraphy: new FormControl()
    });
    // Crea el formulario 
    this.form = this.analysisForm.form;
    //inicializa la fecha
    this.dateService.getDate().subscribe(res=>{
      this.date= res.json();
      this.form.get('date').setValue(res.json());
    });;
  }
  // Recibe los datos del paciente (del primer formulario)
  public receiveData(patientForm){
    this.form.setValue(patientForm);
    console.log(this.form);
  }
  // Inicializa los resultados de los Análisis
  public initResults(imgAnalysis, typeAnalysis){
    switch(typeAnalysis){
      case 'photography':
        this.results.get('imagePhotography').setValue(imgAnalysis);
        break;
      case 'teleradiography':
        this.results.get('imageTeleradiography').setValue(imgAnalysis);
        break;
      case 'orthopantomography':
        this.results.get('imageOrthopantomography').setValue(imgAnalysis);
        break;
      case 'condylegraphy':
        this.results.get('imageCondylegraphy').setValue(imgAnalysis);
        break;
    }
    console.log(this.results.value);
  }
  //Guarda los resultados de todo el análisis en la Base de Datos
  public saveAnalysis(){
    
      // Guarda y obtiene el id de la imagen resultante en Analisis Fotografico
      this.photographyService.add(this.results.get('imagePhotography').value).subscribe(res=>{
        console.log(res.json());

          this.form.get('photographyImage').setValue({id: res.json().id -1});
          // Guarda y obtiene el id de la imagen resultante en Analsiis Teleradiografia
          this.teleradiographyService.add(this.results.get('imageTeleradiography').value).subscribe(res=>{
            this.form.get('teleradiographyImage').setValue({id: res.json().id -1});
            // Guarda y obtiene el id de la imagen resultante en Analsiis Ortopantomografia
            this.orthopantomographyService.add(this.results.get('imageOrthopantomography').value).subscribe(res=>{
              this.form.get('orthopantomographyImage').setValue({id: res.json().id -1});
              // Guarda y obtiene el id de la imagen resultante en Analsiis Ortopantomografia
              this.condylegraphyService.add(this.results.get('imageCondylegraphy').value).subscribe(res=>{
                this.form.get('condylegraphyImage').setValue({id: res.json().id -1});
                // Guarda todo el formulario completo
                console.log(this.form.value);
                this.analysisService.add(this.form.value).subscribe(res=>{
                  console.log(res.json());
                },
                err => {
                  var respuesta = err.json();
                  //this.toastr.error(respuesta.mensaje);
                });
              },
              err => {
                var respuesta = err.json();
                //this.toastr.error(respuesta.mensaje);
              });
            },
            err => {
              var respuesta = err.json();
              //this.toastr.error(respuesta.mensaje);
            });
          },
          err => {
            var respuesta = err.json();
            //this.toastr.error(respuesta.mensaje);
          });
        },
        err => {
          var respuesta = err.json();
          //this.toastr.error(respuesta.mensaje);
      });
  }
}
