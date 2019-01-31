import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/modules/users';
import { UserService } from 'src/app/services/user.service';
import { RolService } from 'src/app/services/rol.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // define el formulario
  public form: FormGroup;
  //Define la lista completa de registros
  public listUsers:Array<any> = [];
  //Define la lista para roles
  public listRoles:Array<any> = [];
  //Define el usuario
  public user:any = null;
  //Define una bandera por si cambia la foto
  public flag: boolean= false;
  //Id de la imagen de Perfil
  public idImage: number;
  constructor(private appComponent: AppComponent, private userImageService: UserImageService, private rolService: RolService, private users: Users, private userService: UserService, private toastr: ToastrService ) {
    
   }

  ngOnInit() {
    //Establece el usuario
    this.user = this.appComponent.getUser();
    //inicializa el formulario y sus elementos
    this.form= this.users.form;
    //Obtiene la lista completa de registros (los muestra en la pestaña Listar)
    this.list();
    //Obtiene la lista completa de Roles
    this.listRol();
    //Muestra los datos del usuario en el formulario
    this.loadDataUser(this.user);
    //Establece valores por defecto
    this.setDefaultValues();
    
    
  }
  //Establece valores por defecto
  private setDefaultValues(){
    this.idImage= this.form.get('userImage').value.id;
    //Crea un json img vacio
    let img = { name: null, data: this.form.get('userImage').value.data, id: this.idImage };
    //Establece el json vacio a imagen
    this.form.get('userImage').setValue(img);
    console.log(this.form.value);
  }
  //Establece el formulario 
  public loadDataUser(elemento) {
    this.form.reset();
    this.userService.getByUsername(elemento.username).subscribe(res=>{
      this.user= res.json();
    });
    this.form.patchValue(this.user);
    this.form.get('userImage').value.data=atob(this.form.get('userImage').value.data);
  }
  //Formatea el valor del autocompletado
  public displayFn(elemento) {
    if(elemento != undefined) {
      return elemento.name ? elemento.name : elemento;
    } else {
      return elemento;
    }
  }
//Funcion para determina que accion se requiere (Agregar, Actualizar, Eliminar)
public action() {
  this.update();
}
// Carga en listaCompleta todos los registros de la DB
private list(){
  this.userService.list().subscribe(
    res => {
      this.listUsers=res.json();
    },
    err=>{
      var response = err.json();
      this.toastr.error(response.mensaje);
    });
  }
  // Carga en listaCompleta todos los registros de la DB
  private listRol(){
    this.rolService.list().subscribe(
      res => {
        this.listRoles=res.json();
      },
      err=>{
        var response = err.json();
        this.toastr.error(response.mensaje);
      });
  }
  //Actualiza un registro
  private update(){
    this.userImageService.update(this.form.value.userImage).subscribe(
      res => {
        let img= this.form.get('userImage').value;
        this.form.get('userImage').setValue({ id: this.form.value.userImage.id });
        this.form.get('rol').setValue({ id: this.form.get('rol').value.id });
        this.userService.update(this.form.value).subscribe(
          res => {
            var respuesta = res.json();
            if (respuesta.codigo == 200) {
              setTimeout(function () {
                document.getElementById('idFirstname').focus();
              }, 20);
              this.toastr.success(respuesta.mensaje);
              this.form.get('userImage').setValue(img);
            }
          },
          err => {
            var respuesta = err.json();
            this.toastr.error(respuesta.mensaje);
          }
        );
      },
      err => {
        var response = err.json();
        this.toastr.error(response.mensaje);
      });
  }
  //Reestablece los campos formularios
  private reestablishForm(id) {
    this.flag=false;
    this.setDefaultValues();
    this.loadDataUser(this.user);   
  }
  //Manejo de colores de campos y labels
  public cambioCampo(id, label) {
    document.getElementById(id).classList.remove('is-invalid');
    document.getElementById(label).classList.remove('label-error');
  };
   //Define el mostrado de datos y comparacion en campo select
   public compareFn = this.compararFn.bind(this);
   private compararFn(a, b) {
     if(a != null && b != null) {
       return a.id === b.id;
     }
   }
  //Carga la imagen del paciente
  public readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e =>{
        let image = {
          name: file.name,
          data: reader.result,
          id: this.idImage
        }
        this.form.get('userImage').setValue(image);
      }
      reader.readAsDataURL(file);
    }
  }
}
