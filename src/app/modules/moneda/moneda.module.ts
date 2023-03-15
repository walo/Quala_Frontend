import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonedaComponent } from './moneda/moneda.component';
import { MonedasComponent } from './monedas/monedas.component';
import { MonedaRoutingModule } from './moneda.routing';
import { ZorroModule } from '../zorro/zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MonedaComponent,
    MonedasComponent
  ],
  imports: [
    CommonModule,
    MonedaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ZorroModule
  ]
})
export class MonedaModule { }
