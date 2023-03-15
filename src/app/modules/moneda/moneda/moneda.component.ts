import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Moneda } from 'src/app/interfaces/moneda';
import { MonedaService } from '../moneda.service';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss']
})
export class MonedaComponent implements OnInit {

  monedaForm!: FormGroup;
  moneda!:Moneda;
  titulo = "Nueva moneda";
  moneda_id!: number;
  modoEdicion = false;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _servicio: MonedaService) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario():void{
    this.monedaForm = this.fb.group({
      mndNombre : ['', Validators.required ]
    });

    this.activatedRoute.params.subscribe(params => {

      if (params["id"] == undefined) {
        return;
      }

      this.modoEdicion = true;
      this.moneda_id = params["id"];

      this.titulo = "Actualizando moneda " + this.moneda_id;

      this._servicio.getById(this.moneda_id).subscribe({
        next:(v) => {  
          console.log(v);
          this.moneda = v.data;
          this.cargaForm(this.moneda);
         },
        error:(er) => {
          console.log(er);
        },
        complete:() => console.log("Final del proceso")
      });

    });
  }

  cargaForm(moneda: Moneda):void{
    this.monedaForm.reset({
      mndNombre:moneda.mndNombre
    });
  }

  submitForm(){
    if(this.modoEdicion){
      this.moneda.mndNombre = this.monedaForm.get('mndNombre')!.value;
      this._servicio.updMonedas(this.moneda_id, this.monedaForm.value).subscribe({
        next: (v) => {
          //console.log(v);
        },
        error: (er) => { 
          console.log(er);
        },
        complete:() => {
          this.router.navigate(['/moneda'])
        }
      });
    }else{
      this._servicio.addMonedas(this.monedaForm.value).subscribe({
        next: (v) => {
          // console.log(v);
        },
        error: (er) => { 
          console.log(er);
        },
        complete:() => {
          this.router.navigate(['/moneda'])
        }
      });
    }
  }

}
