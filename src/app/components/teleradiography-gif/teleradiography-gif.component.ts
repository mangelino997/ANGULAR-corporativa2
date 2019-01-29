import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AtImageGifService } from 'src/app/services/at-image-gif.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teleradiography-gif',
  templateUrl: './teleradiography-gif.component.html',
  styleUrls: ['./teleradiography-gif.component.scss']
})
export class TeleradiographyGifComponent implements OnInit {
  //Define el formulario
  public gifForm:FormGroup;
  //Define la lista de tipos de analisis
  public typesAnalysis:Array<any> = [];
  //Constructor
  constructor(private toast: ToastrService, private atImageGifService: AtImageGifService) {

   }
  ngOnInit() {
  //Inicializa el Formulario
  this.gifForm= new FormGroup({
    image: new FormControl('', Validators.required)
  });
}
//Carga la imagen del paciente
public readURL(event): void {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.gifForm.get('image').setValue(reader.result);
    reader.readAsDataURL(file);
  }
}
//Guarda en la Base de Datos
public save(){
  this.atImageGifService.add(this.gifForm.get('image').value).subscribe(res=>{
    this.toast.success("Agregado con exito");
    this.reestablishForm();
  },
  err=>{
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
}
}
