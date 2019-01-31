import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/modules/users';
import { UserService } from 'src/app/services/user.service';
import { TabService } from 'src/app/services/tab.service';
import { RolService } from 'src/app/services/rol.service';
import { UserImageService } from 'src/app/services/user-image.service';
import { IndicativeImageService } from 'src/app/services/indicative-image.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  //Define el formulario
  public form: FormGroup;
  //Define la lista completa de registros
  public listUsers: Array<any> = [];
  //Define la lista para roles
  public listRoles: Array<any> = [];
  // define la lista de pestañas 
  public tabs: Array<any>;
  // define el link que sera activado
  public activeLink: any;
  // define el autocompletado como un formControl
  public autocomplete: FormControl = new FormControl();
  //Define la pestania actual seleccionada
  public currentTab: string = null;
  //Define si mostrar el autocompletado
  public showAutocomplete: boolean = null;
  //Define si el campo es de solo lectura
  public readonly: boolean = false;
  //Define si mostrar el boton
  public showButton: boolean = null;
  //Define el indice seleccionado de pestania
  public selectedIndex: number = null;
  //Define la lista de resultados de busqueda
  public resultUsers: Array<any> = [];
  //Constructor
  constructor(private userImageService: UserImageService, private rolService: RolService, 
    private users: Users, private userService: UserService, private toastr: ToastrService, 
    private tabService: TabService, private indicativeImageService: IndicativeImageService) {
    this.autocomplete.valueChanges.subscribe(data => {
      if (typeof data == 'string') {
        this.userService.listByName(data).subscribe(res => {
          this.resultUsers = res;
        })
      }
    })
  }
  //Al inicializarse el componente
  ngOnInit() {
    //Inicializa el formulario y sus elementos
    this.form = this.users.form;
    //Carga desde un principio las pestañas "Agregar, Consultar, Actualizar y listar"
    this.tabService.listBySuboptionAndShowTrue(8).subscribe(
      res => {
        this.tabs = res.json();
        this.activeLink = this.tabs[0].name;
      }
    );
    //Establece los valores, activando la primera pestania 
    this.selectTab(1, 'Agregar', 0);
    //Obtiene la lista completa de registros (los muestra en la pestaña Listar)
    this.list();
    //Obtiene la lista completa de Roles
    this.listRol();
    //Establece valores por defecto
    this.setDefaultValues();
  }
  //Establece valores por defecto
  private setDefaultValues() {
    //Crea un json img vacio
    let img = { id: null, name: null, data: null };
    //Obtiene la imagen de usuario por defecto
    this.indicativeImageService.getById(6).subscribe(res => {
      img.data = atob(res.json().data);
    });
    //Establece el json vacio a imagen
    this.form.get('userImage').setValue(img);
  }
  //Establece el formulario al seleccionar elemento del autocompletado
  public autocompleteChange() {
    this.form.setValue(this.autocomplete.value);
    this.form.get('userImage').value.data = atob(this.form.get('userImage').value.data);
  }
  //Funcion para establecer los valores de las pestañas
  private setTabValues(nameTab, autocomplete, readonly, button, component) {
    this.currentTab = nameTab;
    this.showAutocomplete = autocomplete;
    this.readonly = readonly;
    if (readonly) {
      this.form.get('rol').disable();
    }
    else {
      this.form.get('rol').enable();
    }
    this.showButton = button;
    setTimeout(function () {
      document.getElementById(component).focus();
    }, 20);
    this.autocomplete.reset();
  };
  //Establece valores al seleccionar una pestania
  public selectTab(id, nombre, opcion) {
    this.form.reset();
    this.selectedIndex = id;
    this.activeLink = nombre;
    this.list();
    this.setDefaultValues();
    if (opcion == 0) {
      this.autocomplete.setValue(undefined);
      this.resultUsers = [];
    }
    switch (id) {
      case 1:
        this.getNextId();
        this.setTabValues(nombre, false, false, true, 'idFirstname');
        break;
      case 2:
        this.setTabValues(nombre, true, true, false, 'idAutocomplete');
        break;
      case 3:
        this.setTabValues(nombre, true, false, true, 'idAutocomplete');
        break;
      case 4:
        this.setTabValues(nombre, true, true, true, 'idAutocomplete');
        break;
      case 5:
        this.setTabValues(nombre, true, true, true, 'idAutocomplete');
        break;
      default:
        break;
    }
  }
  //Funcion para determina que accion se requiere (Agregar, Actualizar, Eliminar)
  public action(indice) {
    switch (indice) {
      case 1:
        this.add();
        break;
      case 3:
        this.update();
        break;
      case 4:
        this.delete();
        break;
      default:
        break;
    }
  }
  //Obtiene el ID del modulo traido desde la base de datos y lo muestra en el campo id del formulario.
  private getNextId() {
    this.userService.getNextId().subscribe(
      res => {
        this.form.get('id').setValue(res.json());
      },
      err=>{
        var response = err.json();
        this.toastr.error(response.mensaje);
      });
  }
  // Carga en listaCompleta todos los registros de la DB
  private list() {
    this.userService.list().subscribe(
      res => {
        this.listUsers = res.json();
      },
      err=>{
        var response = err.json();
        this.toastr.error(response.mensaje);
      });
  }
  // Carga en listaCompleta todos los registros de la DB
  private listRol() {
    this.rolService.list().subscribe(
      res => {
        this.listRoles = res.json();
      },
      err=>{
        var response = err.json();
        this.toastr.error(response.mensaje);
      });
  }
  //Agrega un registro 
  private add() {
    this.userImageService.add(this.form.value.userImage).subscribe(
      res => {
        var idImage = res.json().id - 1;
        this.form.get('userImage').setValue({ id: idImage });
        this.form.get('rol').setValue({ id: this.form.get('rol').value.id });
        this.userService.add(this.form.value).subscribe(
          res => {
            var respuesta = res.json();
            this.reestablishForm(respuesta.id);
            setTimeout(function () {
              document.getElementById('idFirstname').focus();
            }, 20);
            this.toastr.success(respuesta.mensaje);
          },
          err => {
            var response = err.json();
            this.toastr.error(response.mensaje);
          });
      },
      err => {
        var response = err.json();
        this.toastr.error(response.mensaje);
      });
  }
  //Actualiza un registro
  private update() {
    this.userImageService.update(this.form.value.userImage).subscribe(
      res => {
        this.form.get('userImage').setValue({ id: this.form.value.userImage.id });
        this.form.get('rol').setValue({ id: this.form.get('rol').value.id });
        this.userService.update(this.form.value).subscribe(
          res => {
            var respuesta = res.json();
            if (respuesta.codigo == 200) {
              this.reestablishForm(undefined);
              setTimeout(function () {
                document.getElementById('idAutocomplete').focus();
              }, 20);
              this.toastr.success(respuesta.mensaje);
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
  //Elimina un registro
  private delete() {
    this.userService.delete(this.form.get('id').value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  //Reestablece los campos formularios
  private reestablishForm(id) {
    this.form.reset();
    this.form.get('id').setValue(id);
    this.autocomplete.setValue(undefined);
    this.resultUsers = [];
    this.setDefaultValues();
  }
  //Manejo de colores de campos y labels
  public changeField(id, label) {
    document.getElementById(id).classList.remove('is-invalid');
    document.getElementById(label).classList.remove('label-error');
  };
  //Muestra en la pestania buscar el elemento seleccionado de listar
  public activeConsult(elemento) {
    this.selectTab(2, this.tabs[0].name, 1);
    this.autocomplete.setValue(elemento);
    this.form.patchValue(elemento);
  }
  //Muestra en la pestania actualizar el elemento seleccionado de listar
  public activeUpdate(elemento) {
    this.selectTab(3, this.tabs[1].name, 1);
    this.autocomplete.setValue(elemento);
    this.form.patchValue(elemento);
  }
  //Formatea el valor del autocompletado
  public displayFn(element) {
    if (element != undefined) {
      return element.name ? element.name : element;
    } else {
      return element;
    }
  }
  //Define el mostrado de datos y comparacion en campo select
  public compareFn = this.compararFn.bind(this);
  private compararFn(a, b) {
    if (a != null && b != null) {
      return a.id === b.id;
    }
  }
  //Carga la imagen del paciente
  public readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        let image = {
          id: this.form.get('userImage').value.id,
          name: file.name,
          data: reader.result
        }
        this.form.get('userImage').setValue(image);
      }
      reader.readAsDataURL(file);
    }
  }
}
