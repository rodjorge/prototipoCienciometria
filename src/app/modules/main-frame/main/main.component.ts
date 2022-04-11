import { Component, OnInit } from '@angular/core';
import cytoscape, { Core } from 'cytoscape';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private cy: Core;
  constructor() { 
    this.cy = cytoscape();
  }

  ngOnInit(): void {
    this.cy = cytoscape(
      { 
        container: document.getElementById('cy')
      })

    this.cy.add({data: {id: 'a'}});
    this.cy.add({data: {id: 'b'}});
    this.cy.add({data: {id: 'ab', source:'a', target:'b'}})
    this.cy.layout({name:'random'}).run()
  }

  get cytoscapeCore(): Core{
    return this.cy;
  }
}
