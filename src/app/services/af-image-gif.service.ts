import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppService } from './app.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';

@Injectable()
export class AfImageGifService {
  //Define la ruta al servicio web
  private route:string = "/afImageGif";
  //Define la url base
  private url:string = null;
  //Define la url para subcripcion a socket
  private topic:string = null;
  //Define el headers y token de autenticacion
  private options = null;
  //Define la subcripcion
  private subcripcion: Subscription;
  //Define el mensaje de respuesta a la subcripcion
  private message: Observable<Message>;
  //Define la lista completa
  public completeList:Subject<any> = new Subject<any>();
  //Constructor
  constructor(private http: Http, private appService: AppService, private stompService: StompService) {
    //Establece la url base
    this.url = this.appService.getUrlBase() + this.route;
    //Establece la url de subcripcion a socket
    this.topic = this.appService.getTopic();
    //Establece los headers y el token
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({headers: headers});
    //Subcribe al usuario a la lista completa
    this.message = this.stompService.subscribe(this.topic + this.route + '/list');
    this.subcripcion = this.message.subscribe(this.subscribirse);
  }
  //Resfresca la lista completa si hay cambios
  public subscribirse = (m: Message) => {
    this.completeList.next(JSON.parse(m.body));
  }
  //Obtiene un gif por posicion y sexo
  public getImageByPositionAndSex(position, idSex) {
    return this.http.get(this.url + '/getImageByPositionAndSex/' + position + '/' + idSex, this.options);
  }
  //Obtiene un registro por posicion y sexo
  public getByPositionAndSex(position, idSex) {
    return this.http.get(this.url + '/getByPositionAndSex/' + position + '/' + idSex, this.options);
  }
  //Obtiene el siguiente id
  public getNextId() {
    return this.http.get(this.url + '/getNextId', this.options);
  }
  //Obtiene la lista de registros
  public list() {
    return this.http.get(this.url, this.options);
  }
  //Obtiene un listado por nombre
  public listByName(name) {
    return this.http.get(this.url + '/listByName/' + name, this.options).map(res => {
      return res.json().map(data => {
        return data;
      })
    })
  }
  //Agrega un registro
  public add(elemento) {
    return this.http.post(this.url, elemento, this.options);
  }
  //Actualiza un registro
  public update(elemento) {
    return this.http.put(this.url, elemento, this.options);
  }
  //Elimina un registro
  public delete(id) {
    return this.http.delete(this.url + '/' + id, this.options);
  }
}