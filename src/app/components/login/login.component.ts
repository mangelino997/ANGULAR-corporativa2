import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //Evento que envia los datos del formulario al componente padre
  @Output() dataEvent = new EventEmitter<any>();
  //Define el formulario
  public form:FormGroup;
  //Define mensaje de error de logueo
  public incorrectLogin:string = null;
  //Constructo
  constructor(private loginService: LoginService, private userService: UserService,
    private appComponent: AppComponent, private router: Router, private toast: ToastrService) { }
  //Al inicializarse el componente
  ngOnInit() {
    //Crea el formulario
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  //Envia los datos al componente padre
  public sendData(state): void {
    this.dataEvent.emit(state);
  }
  //Verifica credenciales del usuario
  public login(): void {
    this.loginService.login(this.form.value.username, this.form.value.password).subscribe(
      res => {
        if(res.headers.get('authorization')) {
          //Almacena el token en el local storage
          localStorage.setItem('token', res.headers.get('authorization'));
          //Obtiene el usuario por username
          this.userService.getByUsername(this.form.value.username).subscribe(
            res => {
              this.appComponent.setUser(res.json());
              this.sendData(true);
              this.router.navigate(['dashboard']);
            },
            err => {
              this.toast.success("No se puede obtener datos del Usuario");
            }
          );
        } else {
          this.router.navigate(['']);
        }
      },
      err => {
        this.incorrectLogin = "Credenciales Incorrectas!";
        this.router.navigate(['']);
      }
    );
  }
  //Elimina el mensaje de credenciales incorrectas
  public removeMessage(): void {
    this.incorrectLogin = null;
  }
}