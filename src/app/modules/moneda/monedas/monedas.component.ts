import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moneda, RMonedas } from 'src/app/interfaces/moneda';
import { MonedaService } from '../moneda.service';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.scss']
})
export class MonedasComponent implements OnInit {

  rMonedas?:RMonedas;
  loading = false;
  monedas:Moneda[] = [];
  listOfDisplayData = [...this.monedas];

  constructor(private _servicio: MonedaService, private router: Router,) { }

  ngOnInit(): void {
    this.consumeServicio();
  }

  consumeServicio():void{
    this.loading = true;
    this._servicio.getMonedas().subscribe({
      next:(v) =>{
        this.monedas = v.data;
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
    this._servicio.delMonedas(id).subscribe({
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
    this.router.navigate(["/moneda/moneda"]);
  }

  actualizar(id:number):void{
    this.router.navigate(["/moneda/moneda/"+id]);
  }

}
