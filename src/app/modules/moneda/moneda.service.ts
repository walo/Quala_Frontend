import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Moneda, RMoneda, RMonedas } from '../../interfaces/moneda';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  apiUrl: string = 'http://localhost:60911/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  public getMonedas():Observable<RMonedas>{
    let API_URL = `${this.apiUrl}/Moneda/GetAll`;
    let headers = new HttpHeaders();
    return this.http.get<RMonedas>(API_URL, {headers : headers});
  }

  public getById(id:number):Observable<RMoneda>{
    let API_URL = `${this.apiUrl}/Moneda/GetById?MndId=${id}`;
    let headers = new HttpHeaders();
    return this.http.get<RMoneda>(API_URL, {headers : headers});
  }

  public addMonedas(_moneda:Moneda):Observable<Moneda>{
    let API_URL = `${this.apiUrl}/Moneda`;
    let json = JSON.stringify(_moneda);
    return this.http.post<Moneda>(API_URL, json, {headers : this.headers});
  }

  public delMonedas(id:number):Observable<RMonedas>{
    let API_URL = `${this.apiUrl}/Moneda?MndId=${id}`;
    let headers = new HttpHeaders();
    return this.http.delete<RMonedas>(API_URL, {headers : headers});
  }

  public updMonedas(id:number, _moneda:Moneda):Observable<Moneda>{
    let API_URL = `${this.apiUrl}/Moneda?MndId=${id}`;
    let json = JSON.stringify(_moneda);
    return this.http.put<Moneda>(API_URL, json, {headers : this.headers});
  }
}
