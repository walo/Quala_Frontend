import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RSucursales, RSucursal, Sucursal } from '../../interfaces/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  apiUrl: string = 'http://localhost:60911/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  public getSucursales():Observable<RSucursales>{
    let API_URL = `${this.apiUrl}/Sucursal/GetAll`;
    let headers = new HttpHeaders();
    return this.http.get<RSucursales>(API_URL, {headers : headers});
  }

  public getById(id:number):Observable<RSucursal>{
    let API_URL = `${this.apiUrl}/Sucursal/GetById?SucCodigo=${id}`;
    let headers = new HttpHeaders();
    return this.http.get<RSucursal>(API_URL, {headers : headers});
  }

  public addSucursal(_sucursal:Sucursal):Observable<Sucursal>{
    let API_URL = `${this.apiUrl}/Sucursal`;
    let json = JSON.stringify(_sucursal);
    return this.http.post<Sucursal>(API_URL, json, {headers : this.headers});
  }

  public delSucursal(id:number):Observable<RSucursales>{
    let API_URL = `${this.apiUrl}/Sucursal?SucCodigo=${id}`;
    let headers = new HttpHeaders();
    return this.http.delete<RSucursales>(API_URL, {headers : headers});
  }

  public updSucursal(id:number, _sucursal:Sucursal):Observable<Sucursal>{
    let API_URL = `${this.apiUrl}/Sucursal?SucCodigo=${id}`;
    let json = JSON.stringify(_sucursal);
    return this.http.put<Sucursal>(API_URL, json, {headers : this.headers});
  }
  
}
