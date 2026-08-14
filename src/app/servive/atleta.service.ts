import { Injectable } from '@angular/core';
import { Atleta } from '../models/atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {
  private atletas: Atleta[] = []

    //DEPLARAÇÃO DAS FUNÇÕES DE MANIPULAÇÃO DO ARRAY
    //ADICIONANDO ELEMENTO
    adicionarAtleta(atleta: Atleta){
        this.atletas.push(atleta)
    }

    //LISTAR ELEMTENTOS
    listarAtleta(){
      console.table(this.atletas)

      return this.atletas
    }


    //REMOVER ELEMENTOS
    removerElemento(idAtleta: number){
      this.atletas = this.atletas.filter(elem=>elem.id !== idAtleta)
    }

    //ALTERANDO ELEMENTO DO ARRAY
    removerElemento2(atleta: Atleta){
      let posArray = this.atletas.findIndex(elem=>elem.id !== atleta.id)
      this.atletas[posArray] = atleta
    }

}
