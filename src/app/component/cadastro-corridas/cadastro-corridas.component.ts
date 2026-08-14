import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CadCorridaService } from '../../servive/cad-corrida.service'; 
import { CadCorrida } from '../../models/cadastro-corridas';

@Component({
  selector: 'app-cadastro-corridas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './cadastro-corridas.component.html',
  styleUrl: './cadastro-corridas.component.css'
})
export class CadastroCorridasComponent {
  //DECLARANDO ATRIBUTOS
  id = 0
  descricao = ''
  data = ''
  distancia = 0

  constructor(private cadCorridaService: CadCorridaService) {  }

    //DECLARAÇÃO DE FUNÇÕES
    exibirDados(){
      console.log( CadCorrida )
    }



    limparDados(){
      this.id = 0
      this.descricao = ''
      this.data = ''
      this.distancia = 0
    }


salvar(){

  const cadCorrida = new CadCorrida()
    cadCorrida.id = this.id
    cadCorrida.descricao = this.descricao
    cadCorrida.data = this.data
    cadCorrida.distancia = this.distancia


  this.cadCorridaService.adicionarCorrida(cadCorrida)

  this.limparDados()

  this.cadCorridaService.listarCorrida()

}

}