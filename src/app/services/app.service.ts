import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //Define la url base - Conexion con el servicio web
  public URL_BASE:string = 'http://localhost:8084/meserws/auth';
  //Constructor
  constructor() { }
  //Obtiene la url base
  public getUrlBase() {
    return this.URL_BASE;
  }
}
