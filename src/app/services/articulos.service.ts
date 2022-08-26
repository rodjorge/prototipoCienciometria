import { Injectable } from '@angular/core';
import autoresArticulosJSON from '../../assets/json/autores-articulos.json';


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private autoresArticulos = autoresArticulosJSON
  constructor() { 
    console.log(this.autoresArticulos.result)
    let autores = this.getAutores();
    let articulo = this.getArticulos()[0];
    
    articulo.in_autorDe?.forEach(autorDe => {
      autores.forEach(autor => {
        if(autorDe === autor['@rid']) console.log("SE ENCONTRO COINCIDENCIA: ", autor);
      })
    })
  }

  public getAutores(){
    return this.autoresArticulos.result.filter(res => res['@class'] === 'Autor');
  }

  public getArticulos(){
    return this.autoresArticulos.result.filter(res => res['@class'] === 'Articulo');
  } 

  public getAutoresArticulo(articulo:any){
    let autores = this.getAutores();

    return autores.filter(autor => true);
  }
}
