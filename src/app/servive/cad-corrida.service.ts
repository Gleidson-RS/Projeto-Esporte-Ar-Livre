import { Injectable } from '@angular/core';
import { CadCorrida } from '../models/cadastro-corridas';

@Injectable({
  providedIn: 'root'
})
export class CadCorridaService {
  private cadCorridas: CadCorrida[] = []

    //DEPLARAÇÃO DAS FUNÇÕES DE MANIPULAÇÃO DO ARRAY
    //ADICIONANDO ELEMENTO
    adicionarCorrida(cadCorrida: CadCorrida){
        //ARRRRRMMMMENNGUE PRA GERAR ID
        cadCorrida.id = this.cadCorridas.length + 1
        this.cadCorridas.push(cadCorrida)
    }

    //LISTAR ELEMTENTOS
    listarCorrida(){
      console.table(this.cadCorridas)

      return this.cadCorridas
    }

    //REMOVER ELEMENTOS
    removerElemento(idCadCorrida: number){
      this.cadCorridas = this.cadCorridas.filter(elem=>elem.id !== idCadCorrida)
    }

    //ALTERANDO ELEMENTO DO ARRAY
    removerElemento2(cadCorrida: CadCorrida){
      let posArray = this.cadCorridas.findIndex(elem=>elem.id !== cadCorrida.id)
      this.cadCorridas[posArray] = cadCorrida
    }

}