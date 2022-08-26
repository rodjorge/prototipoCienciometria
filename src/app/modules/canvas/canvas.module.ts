import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { MainFrameModule } from '../main-frame/main-frame.module';
import { CanvasComponent } from './canvas/canvas.component';



@NgModule({
  declarations: [
    InstitucionesComponent,
    ArticulosComponent,
    CanvasComponent
  ],
  imports: [
    CommonModule,
    MainFrameModule
  ],
  exports:[
    CanvasComponent
  ]
})
export class CanvasModule { }
