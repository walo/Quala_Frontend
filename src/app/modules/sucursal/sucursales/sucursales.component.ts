import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SucursalService } from '../sucursal.service';
import { RSucursales, Sucursal } from '../../../interfaces/sucursal';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {

  rSucursales?:RSucursales;
  loading = false;
  sucursales:Sucursal[] = [];
  listOfDisplayData = [...this.sucursales];

  constructor(private _servicio: SucursalService, private router: Router,) { }

  ngOnInit(): void {
    this.consumeServicio();
  }

  consumeServicio():void{
    this.loading = true;
    this._servicio.getSucursales().subscribe({
      next:(v) =>{
        this.sucursales = v.data;
        this.listOfDisplayData = v.data;
      },
      error:(err) => {
        console.log('error',err);
        this.loading = false;
      },
      complete:() => {
        this.loading = false;
      }
    });
  }

  Borrar(id:number):void{
    this._servicio.delSucursal(id).subscribe({
      next:(v) =>{
        //console.log(v)
      },
      error:(err) => {
        console.log('error',err)
        if(err.status == 400){
          alert(err.error.errors[0].message);
        }
      },
      complete:() => this.consumeServicio()
    });
  }

  nuevo(){
    this.router.navigate(["/sucursal/sucursal"]);
  }

  actualizar(id:number):void{
    this.router.navigate(["/sucursal/sucursal/"+id]);
  }

}
