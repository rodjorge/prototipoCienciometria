import { Injectable } from '@angular/core';
import autoresInstitucionJSON from '../../assets/json/autores-institucion.json';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {

  private autoresInstitucion = autoresInstitucionJSON
  constructor() { 
    console.log(this.autoresInstitucion.result);
  }

  getAutoresInstitucion(institucion:any){
    let autores = this.getAutores();

    return autores.filter(autor => true)
  }

  getInstituciones(){
    return this.autoresInstitucion.result.filter(res => res['@class'] === 'Institucion');
  }

  getAutores(){
    return this.autoresInstitucion.result.filter(res => res['@class'] === 'Autor' );
  }
}
