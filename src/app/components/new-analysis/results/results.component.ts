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
  //Define el evento que emite datos al componente padre
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario Resultados (imagenes de los canvas trazados)
  public analysisForm: FormGroup;
  //Define la imagen del paciente
  public patientImage:any;
  //Define la imagen de la fotografia
  public photographyImage:any;
  //Define la imagen de la teleradiografia
  public teleradiographyImage:any;
  //Define la imagen de la ortopantomografia
  public orthopantomographyImage:any;
  //Define la imagen de la condilografia
  public condylegraphyImage:any;
  //Define la fecha actual
  public date: string = null;
  //Constructor
  constructor(
    private analysisModel: Analysis,
    private photographyService: PhotographyImageService,
    private teleradiographyService: TeleradiographyImageService,
    private orthopantomographyService: OrthopantomographyImageService,
    private condylegraphyService: CondylegraphyImageService,
    private dateService: DateService,
    private analysisService: AnalysisService,
    private toastr: ToastrService) {}
  //Al inicializarse el componente
  ngOnInit() {
    //Crea el formulario
    this.analysisForm = this.analysisModel.form;
    //inicializa la fecha
    this.dateService.getDate().subscribe(res => {
      this.date = res.json();
      this.analysisForm.get('date').setValue(res.json());
    });
    //Establece la conclusion
    this.analysisForm.get('conclusion').setValue('Placa de reposición mandibular inferior de 9.2mm de altura interincisiva.');
    //Establece el codigo de la protesis
    this.analysisForm.get('prothesisCode').setValue('AAA123');
  }
<<<<<<< HEAD
  //Recibe el formulario del analisis
  public setAnalysis(analysisForm) {
    this.analysisForm.setValue(analysisForm);
=======
  // Recibe los datos del paciente enviados por New Analisis (del primer formulario)
  public receiveData(patientForm){
    this.form.setValue(patientForm);
    console.log(this.form);
>>>>>>> f5f92798b5cddc3f5929d0708c661f1fd4df8254
  }
  //Inicializa los resultados de los Análisis
  public initResults(image, type) {
    switch (type) {
      case 'patientImage':
        this.patientImage = image;
        break;
      case 'photography':
        this.photographyImage = image;
        break;
      case 'teleradiography':
        this.teleradiographyImage = image;
        break;
      case 'orthopantomography':
        this.orthopantomographyImage = image;
        break;
      case 'condylegraphy':
        this.condylegraphyImage = image;
        break;
    }
  }
  //Guarda los resultados de todo el análisis en la Base de Datos
<<<<<<< HEAD
  public saveAnalysis() {
    this.analysisService.addAnalysis(this.patientImage, this.photographyImage, 
      this.teleradiographyImage, this.orthopantomographyImage, this.condylegraphyImage).subscribe(
        res => {
          let idImages = res.json();
          this.analysisForm.get('patientImage').setValue({id:idImages[0]});
          this.analysisForm.get('photographyImage').setValue({id:idImages[1]});
          this.analysisForm.get('teleradiographyImage').setValue({id:idImages[2]});
          this.analysisForm.get('orthopantomographyImage').setValue({id:idImages[3]});
          this.analysisForm.get('condylegraphyImage').setValue({id:idImages[4]});
          this.analysisService.add(this.analysisForm.value).subscribe(
            res => {
              let response = res.json();
              this.toastr.success(response.mensaje);
=======
  public saveAnalysis(){
    this.form.get('prothesisCode').setValue('AFDFBF33');
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
>>>>>>> f5f92798b5cddc3f5929d0708c661f1fd4df8254
            },
            err => {
              var response = err.json();
              this.toastr.error(response.mensaje);
            });
        },
        err => {
          this.toastr.error('Por favor intentelo nuevamente', 'Error al guardar las imágenes del análisis!');
        }
      );
  }
}
