import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { SucursalComponent } from './sucursal/sucursal.component';

const routes: Routes = [
  { path: '', component: SucursalesComponent },
  { path: 'sucursal', component: SucursalComponent},
  { path: 'sucursal/:id', component: SucursalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }