import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PinService {

  constructor(private http:HttpClient) { }

  getPins() {
    //return this.http.get('/api/pin');
    return this.http.get('http://192.168.22.10/api/pin');
  }

}
