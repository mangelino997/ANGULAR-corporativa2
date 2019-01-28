import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppService } from './app.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { Message } from '@stomp/stompjs';
import { StompService } from '@stomp/ng2-stompjs';

@Injectable()
export class AnalysisService {
  //Define la ruta al servicio web
  private route: string = "/analysis";
  //Define la url base
  private url: string = null;
  //Define la url para subcripcion a socket
  private topic: string = null;
  //Define el headers y token de autenticacion
  private options = null;
  //Define la subcripcion
  private subcripcion: Subscription;
  //Define el mensaje de respuesta a la subcripcion
  private message: Observable<Message>;
  //Define la lista completa
  public completeList: Subject<any> = new Subject<any>();
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
    this.options = new RequestOptions({ headers: headers });
    //Subcribe al usuario a la lista completa
    this.message = this.stompService.subscribe(this.topic + this.route + '/list');
    this.subcripcion = this.message.subscribe(this.subscribirse);
  }
  //Resfresca la lista completa si hay cambios
  public subscribirse = (m: Message) => {
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
  //Obtiene un listado por nombre
  public listByName(name) {
    return this.http.get(this.url + '/listByName/' + name, this.options).map(res => {
      return res.json().map(data => {
        return data;
      })
    })
  }
  //Obtiene un listado por alias
  public listByAlias(alias) {

    return this.http.get(this.url + '/listByAlias/' + alias, this.options);
  }
  //Obtiene los analisis de las ultimas semanas 
  public getTotalByLastWeeks(id, id2) {
    return this.http.get(this.url + '/getTotalByLastWeeks/' + id + '/' + id2, this.options);
  }
  //Obtiene los analisis de los ultimos meses
  public getTotalByLastMonths(id, id2) {
    return this.http.get(this.url + '/getTotalByLastMonths/' + id + '/' + id2, this.options);
  }
  //Obtiene los analisis de los ultimos años
  public getTotalByLastYears(id, id2) {
    return this.http.get(this.url + '/getTotalByLastYears/' + id + '/' + id2, this.options);
  }
  //Obtiene los analisis de los dias
  public getTotalByLastDays(id) {
    return this.http.get(this.url + '/getTotalByLastYears/' + id, this.options);
  }
  //Obtiene por Paciente y Usuario
  public listByPatientAndUser(patient, user) {
    return this.http.get(this.url + '/listByPatientAndUser/' + patient + '/' + user, this.options);
  }
  //Obtiene Paciente y Protesis por codigo
  public listPatientsAndProthesisCodes(code) {
    return this.http.get(this.url + '/listPatientsAndProthesisCodes/' + code, this.options);
  }
  //Obtiene usuarios 
  public listUsersDescAnalysis(code) {
    return this.http.get(this.url + '/listUsersDescAnalysis/' + code, this.options);
  }
  //Agrega las imagenes del analisis
  public addAnalysis(pImage, apImage, atImage, aoImage, acImage) {
    const formData = new FormData();
    let pi = new Blob([pImage], { type: 'image/jpg' });
    let ap = new Blob([apImage], { type: 'image/jpg' });
    let at = new Blob([atImage], { type: 'image/jpg' });
    let ao = new Blob([aoImage], { type: 'image/jpg' });
    let ac = new Blob([acImage], { type: 'image/jpg' });
    formData.append('patientImage', pi);
    formData.append('photographyImage', ap);
    formData.append('teleradiographyImage', at);
    formData.append('orthopantomographyImage', ao);
    formData.append('condylegraphyImage', ac);
    return this.http.post(this.url + '/addImages', formData, this.options);
  }
  //Agrega un registro
  public add(element) {
    return this.http.post(this.url, element, this.options);
  }
  //Actualiza un registro
  public update(element) {
    return this.http.put(this.url, element, this.options);
  }
  //Elimina un registro
  public delete(id) {
    return this.http.delete(this.url + '/' + id, this.options);
  }
}