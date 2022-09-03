import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Core, ElementDefinition, EventObject } from 'cytoscape';
import { InstitucionesService } from 'src/app/services/instituciones.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  @Input()
  public cy!: Core

  constructor(private institucionesService : InstitucionesService) { }

  ngOnInit(): void {
    if(!this.cy) return;
    this.cargarInstituciones();
    this.cargarEventos(); 
  }

  private getInstituciones(): any[]{
    return this.institucionesService.getInstituciones();
  }

  private cargarInstituciones(){
    let instituciones = this.getInstituciones();
    let nodes:ElementDefinition[] = []
    instituciones.forEach((institucion) => {
      let newNode: ElementDefinition = {
        group: 'nodes',
        data: {id: institucion['@rid'], institucion}, 
        classes: 'institucion'
      };
      
      if(!nodes.some(node => node.data.id === newNode.data.id)){
        nodes.push(newNode);
      }
    });
    this.cy.add(nodes);
    this.cy.layout({name:'random'}).run();
  }

  private cargarEventos(){
    let onTapInstitucion = (evt: EventObject) => {
      let node = evt.target
      let nodes: ElementDefinition[] = [];
      let edges: ElementDefinition[] = [];
      const institucion = node._private.data.institucion;
      let autoresInstitucion = this.institucionesService.getAutoresInstitucion(institucion);
  
      autoresInstitucion.forEach(autor => {
        let newNode: ElementDefinition = {
          group:'nodes',
          data:{id:autor['@rid'], autor},
          classes:'autor'
        }
        let newEdge: ElementDefinition = {
          group:'edges',
          data: {target:autor['@rid'], source:institucion['@rid']}
        }
  
        if(!nodes.some(node => node.data.id === newNode.data.id)){
          nodes.push(newNode);
          edges.push(newEdge);
        }
      });
  
      this.cy.add(nodes);
      this.cy.add(edges); 
      this.cy.layout({
        name:'concentric', 
        fit: true, 
        padding: 30, 
        startAngle: 3/2 * Math.PI, 
        clockwise: true, 
        equidistant: true,
        minNodeSpacing: 150,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: false,
        animate: false
      }).run();
    }

    this.cy.on('tap', '.institucion', onTapInstitucion)
  }

  
}
