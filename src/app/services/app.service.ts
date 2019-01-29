import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //Define la IP
  private IP = 'http://192.168.0.32:8084'; //http://localhost:8080 -------http://192.168.0.99:8080
  //Define la url base
  private URL_BASE = this.IP + '/meserws/auth';
  //Define la url de subcripcion a socket
  private URL_TOPIC = '/jitws/auth/topic';
  //Constructor
  constructor() { }
  //Obtiene la IP
  public getIP() {
    return this.IP;
  }
  //Obtiene la url base
  public getUrlBase() {
    return this.URL_BASE;
  }
  //Obtiene la url de subcripcion a socket
  public getTopic() {
    return this.URL_TOPIC;
  }
}
