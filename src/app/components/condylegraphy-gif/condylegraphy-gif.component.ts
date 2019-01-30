import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AcImageGifService } from 'src/app/services/ac-image-gif.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-condylegraphy-gif',
  templateUrl: './condylegraphy-gif.component.html',
  styleUrls: ['./condylegraphy-gif.component.scss']
})
export class CondylegraphyGifComponent implements OnInit {
  //Define el formulario
  public gifForm: FormGroup;
  //Define la lista de tipos de analisis
  public typesAnalysis: Array<any> = [];
  //Constructor
  constructor(private acImageGifService: AcImageGifService, private toast: ToastrService) { }
  ngOnInit() {
    //Inicializa el Formulario
    this.gifForm = new FormGroup({
      image: new FormControl('', Validators.required)
    });
    //Establece valores por defecto
    this.setDefaultValues();
  }
  //Establece valores por defecto
  private setDefaultValues(): void {
    //Crea un json img vacio
    let img = { name: null, data: null };
    //Establece el json vacio a imagen
    this.gifForm.get('image').setValue(img);
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
        this.gifForm.get('image').setValue(image);
      }
      reader.readAsDataURL(file);
    }
  }
  //Guarda en la Base de Datos
  public save() {
    this.acImageGifService.add(this.gifForm.value.image).subscribe(res => {
      this.toast.success("Agregado con exito");
      this.reestablishForm();
    },
    err => {
      this.toast.success("Error al agregar el Gif");
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
    this.gifForm.reset();
    this.setDefaultValues();
  }
}