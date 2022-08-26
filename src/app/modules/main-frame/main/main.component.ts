import { Component, OnInit } from '@angular/core';
import cytoscape, { Core } from 'cytoscape';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private cy!: Core;
  constructor() { 
  }

  ngOnInit(): void {
    this.init();
  }

  get cytoscapeCore(): Core{
    return this.cy;
  }

  public init(){
    this.cy = cytoscape(
      { 
        container: document.getElementById('cy'),
        style: [
          {
            selector: 'node',
            style: {
              "background-color": "lightblue", 
              "text-halign": 'center',
              "font-size": "30",
              "text-wrap": "ellipsis",
              "height": "40",
              "width": "40",
            }
          },
          {
            selector: '.institucion',
            style: {
              "label": 'data(institucion.nombre)',
              "shape": "rectangle"
            }
          },
          {
            selector: '.autor',
            style: {
              "label": 'data(autor.nombre)',
              "shape": "ellipse"
            }
          },
          {
            selector: '.articulo',
            style: {
              "label": 'data(articulo.titulo)',
              "shape": "ellipse"
            }
          }
        ],
        zoom: 1
      })
  }
}
