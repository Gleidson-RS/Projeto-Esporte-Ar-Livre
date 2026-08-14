import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AtletaService } from '../../servive/atleta.service';
import { Atleta } from '../../models/atleta';

@Component({
  selector: 'app-atleta',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './atleta.component.html',
  styleUrl: './atleta.component.css'
})
export class AtletaComponent {
  //DECLARANDO ATRIBUTOS
    nome = ''
    cpf = 0
    sexo = ''
    cep = 0
    ruaLogradouro = ''
    bairro = ''
    cidade = ''
    uf = ''

    constructor(private atletaService: AtletaService) {  }

    //DECLARAÇÃO DE FUNÇÕES
    exibirDados(){
      console.log( Atleta )
    }



    limparDados(){
      this.nome = ''
      this.cpf = 0
      this.sexo = ''
      this.cep = 0
      this.ruaLogradouro = ''
      this.bairro = ''
      this.cidade = ''
      this.uf = ''
      }


salvar(){

  const atleta = new Atleta()
  atleta.nome = this.nome
  atleta.cpf = this.cpf
  atleta.sexo = this.sexo
  atleta.cep = this.cep
  atleta.ruaLogradouro = this.ruaLogradouro
  atleta.bairro = this.bairro
  atleta.cidade = this.cidade
  atleta.uf = this.uf

  this.atletaService.adicionarAtleta(atleta)

  this.limparDados()

  this.atletaService.listarAtleta()

}

}
