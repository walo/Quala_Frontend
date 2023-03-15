import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Moneda } from 'src/app/interfaces/moneda';
import { Sucursal } from '../../../interfaces/sucursal';
import { MonedaService } from '../../moneda/moneda.service';
import { SucursalService } from '../sucursal.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss']
})
export class SucursalComponent implements OnInit {

  sucForm!: FormGroup;
  sucursal!:Sucursal;
  monedas:Moneda[] = [];
  titulo = "Nueva sucursal";
  suc_id!: number;
  modoEdicion = false;
  hoy = new Date();

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _servicio: SucursalService,
    private _monServicio: MonedaService
  ) {
    this.getMonedas();
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario():void{
    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";
    this.sucForm = this.fb.group({
      sucCodigo : [{value: '0', disabled:true}],
      sucDescripcion : ['', Validators.required ],
      sucDireccion : ['', Validators.required ],
      sucIdentificacion : ['', Validators.required ],
      mndId : ['', Validators.required ],
      mndNombre : ['', Validators.required ],
      sucFchReg : [{value: dp.transform(this.hoy, format), disabled: true}]
    });

    this.activatedRoute.params.subscribe(params => {

      if (params["id"] == undefined) {
        return;
      }

      this.modoEdicion = true;
      this.suc_id = params["id"];

      this.titulo = "Actualizando sucursal " + this.suc_id;

      this._servicio.getById(this.suc_id).subscribe({
        next:(v) => {  
          console.log(v);
          this.sucursal = v.data;
          this.cargaForm(this.sucursal);
         },
        error:(er) => {
          console.log(er);
        },
        complete:() => console.log("Final del proceso")
      });

    });
  }

  cargaForm(suc: Sucursal):void{
    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";
    let fecha1 = dp.transform(suc.sucFchReg, format)
    var fecha = new Date(suc.sucFchReg).toLocaleDateString(); // 
    console.log(fecha1);
    this.sucForm.reset({
      sucCodigo: suc.sucCodigo,
      sucDescripcion: suc.sucDescripcion,
      sucDireccion: suc.sucDireccion,
      sucIdentificacion:suc.sucIdentificacion,
      mndId:suc.mndId,
      mndNombre:suc.mndNombre,
      sucFchReg: fecha1
    });
  }

  submitForm(){
    if(this.modoEdicion){
      this._servicio.updSucursal(this.suc_id, this.sucForm.value).subscribe({
        next: (v) => {
          //console.log(v);
        },
        error: (er) => { 
          console.log(er);
        },
        complete:() => {
          this.router.navigate(['/sucursal'])
        }
      });
    }else{
      this._servicio.addSucursal(this.sucForm.value).subscribe({
        next: (v) => {
          // console.log(v);
        },
        error: (er) => { 
          console.log(er);
        },
        complete:() => {
          this.router.navigate(['/sucursal'])
        }
      });
    }
  }

  getMonedas():void{
    this._monServicio.getMonedas().subscribe({
      next:(v) => {
        this.monedas = v.data
       },
      error:(e) => { 
        console.log(e);
      },
      complete:() => { }
    });
  }

  get formularioValido(){
    if (this.sucForm.get('sucDescripcion')!.invalid || 
        this.sucForm.get('sucDireccion')!.invalid ||
        this.sucForm.get('sucIdentificacion')!.invalid ||
        this.sucForm.get('mndId')!.value == 0 ){
          return true;
    }
    return false;
  }

}
