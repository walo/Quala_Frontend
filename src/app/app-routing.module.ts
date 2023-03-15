import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/sucursal' },
  { path: 'sucursal', loadChildren: () => import('./modules/sucursal/sucursal.module').then(s => s.SucursalModule) },
  { path: 'moneda', loadChildren: () => import('./modules/moneda/moneda.module').then(m => m.MonedaModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
