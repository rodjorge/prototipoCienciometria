import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Core } from 'cytoscape';
import { MainComponent } from '../../main-frame/main/main.component';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild(MainComponent)
  private readonly main!:MainComponent;
  public cy!: Core
  public loaded = false;
  public mostrar = "Articulos";

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.main){
      this.cy = this.main.cytoscapeCore;
      this.loaded = true;
      this.cd.detectChanges();
    }
  }

  public mostrarArticulos(){
    this.reset();
    this.mostrar = "Articulos"
  }

  public mostrarInstituciones(){
    this.reset();
    this.mostrar = "Instituciones"
  }

  private reset(){
    this.loaded = false;
    this.main.init();
    this.cy = this.main.cytoscapeCore;
    this.loaded = true;
    this.cd.detectChanges();
  }
}
