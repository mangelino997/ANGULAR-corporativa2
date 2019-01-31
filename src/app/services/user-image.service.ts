import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppService } from './app.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';

@Injectable()
export class UserImageService {
  //Define la ruta al servicio web
  private route:string = "/userImage";
  //Define la url base
  private url:string = null;
  //Define la url para subcripcion a socket
  private topic:string = null;
  //Define el headers y token de autenticacion
  private options = null;
  //Define la subcripcion
  private subscription: Subscription;
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
    this.subscription = this.message.subscribe(this.subs);
  }
  //Resfresca la lista completa si hay cambios
  public subs = (m: Message) => {
    this.completeList.next(JSON.parse(m.body));
  }
  //Obtiene el siguiente id
  public getNextId() {
    return this.http.get(this.url + '/getNextId', this.options);
  }
  //Obtiene la lista de registros
  public list() {
    return this.http.get(this.url, this.options);
  }
  //Obtiene un registro por id
  public getById(id) {
    return this.http.get(this.url + '/getById/' + id, this.options);
  }
  //Agrega un registro
  public add(image) {
    let blob = new Blob([image.data], {type : 'image/jpeg'});
    const formData = new FormData(); 
    formData.append('file', blob, image.name);
		return this.http.post(this.url, formData);
	}
  //Actualiza un registro
  public update(image) {
    let blob = new Blob([image.data], {type : 'image/jpeg'});
    const formData = new FormData(); 
    formData.append('idImage', image.id);
    formData.append('file', blob, image.name);
    return this.http.put(this.url, formData);
  }
  //Elimina un registro
  public delete(id) {
    return this.http.delete(this.url + '/' + id, this.options);
  }
}