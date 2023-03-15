import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { SucursalRoutingModule } from './sucursal.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZorroModule } from '../zorro/zorro.module';



@NgModule({
  declarations: [
    SucursalesComponent,
    SucursalComponent
  ],
  imports: [
    CommonModule,
    SucursalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ZorroModule
  ]
})
export class SucursalModule { }
