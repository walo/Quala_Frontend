import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonedaComponent } from './moneda/moneda.component';
import { MonedasComponent } from './monedas/monedas.component';

const routes: Routes = [
  { path: '', component: MonedasComponent },
  { path: 'moneda', component: MonedaComponent},
  { path: 'moneda/:id', component: MonedaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonedaRoutingModule { }