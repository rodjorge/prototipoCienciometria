import { Component, Input, OnInit } from '@angular/core';
import { Core, ElementDefinition, EventObject } from 'cytoscape';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  @Input()
  public cy!: Core

  constructor(private articulosService: ArticulosService) { }

  ngOnInit(): void {
    if(!this.cy) return;
    this.cargarArticulos();
    this.cargarEventos();
  }

  private getArticulos(){
    return this.articulosService.getArticulos();
  }

  private cargarArticulos(){
    let articulos = this.getArticulos();
    let nodes:ElementDefinition[] = []
    articulos.forEach((articulo) => {
      let newNode: ElementDefinition = {
        group: 'nodes',
        data: {id: articulo['@rid'], articulo}, 
        classes: 'articulo'
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
      const articulo = node._private.data.articulo;
      let autoresArticulo = this.articulosService.getAutoresArticulo(articulo);
  
      autoresArticulo.forEach( autor => {
        let newNode: ElementDefinition = {
          group:'nodes',
          data:{id:autor['@rid'], autor},
          classes:'autor'
        }
        let newEdge: ElementDefinition = {
          group:'edges',
          data: {target:autor['@rid'], source:articulo['@rid']}
        }
  
        if(!nodes.some(node => node.data.id === newNode.data.id)){
          nodes.push(newNode);
          edges.push(newEdge);

          console.log(newNode);
          console.log(newEdge);
          console.log(nodes);
          console.log(edges);
        }
      });
  
      this.cy.add(nodes);
      this.cy.add(edges); 
      this.cy.layout({name:'random'}).run();
    }

    this.cy.on('tap', '.articulo', onTapInstitucion)
  }
}
