import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppService } from './app.service';

@Injectable()
export class LoginService {
  private URL:string;
  constructor(private http: Http, private appServicio: AppService){
    this.URL = this.appServicio.getIP();
  }
  public login(username, password) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.URL + '/login', {'username': username, 'password': password}, {headers: headers});
  }
}