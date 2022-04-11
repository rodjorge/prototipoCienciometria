import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { ArticulosComponent } from './articulos/articulos.component';



@NgModule({
  declarations: [
    InstitucionesComponent,
    ArticulosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CanvasModule { }
