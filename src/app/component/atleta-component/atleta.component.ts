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

  // DECLARANDO ATRIBUTOS
  id = 0;
  nome = '';
  cpf = 0;
  sexo = '';
  cep = 0;
  ruaLogradouro = '';
  bairro = '';
  cidade = '';
  uf = '';

  constructor(private atletaService: AtletaService) { }


  // EXIBIR DADOS
  exibirDados() {
    console.log(this.nome);
    console.log(this.cpf);
    console.log(this.sexo);
    console.log(this.cep);
    console.log(this.ruaLogradouro);
    console.log(this.bairro);
    console.log(this.cidade);
    console.log(this.uf);
  }


  // LIMPAR DADOS
  limparDados() {
    this.id = 0;
    this.nome = '';
    this.cpf = 0;
    this.sexo = '';
    this.cep = 0;
    this.ruaLogradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
  }


  // SALVAR ATLETA
  salvar() {

    console.log('atleta.component.ts');

    const atleta = new Atleta();

    atleta.id = this.id;
    atleta.nome = this.nome;
    atleta.cpf = this.cpf;
    atleta.sexo = this.sexo;
    atleta.cep = this.cep;
    atleta.ruaLogradouro = this.ruaLogradouro;
    atleta.bairro = this.bairro;
    atleta.cidade = this.cidade;
    atleta.uf = this.uf;


    // ENVIA O ATLETA PARA A API
    this.atletaService.adicionarAtleta(atleta).subscribe({

      next: (dados) => {
        console.log('Atleta cadastrado com sucesso!');
        console.log(dados);

        this.limparDados();
      },

      error: (erro) => {
        console.log('Erro ao cadastrar atleta:');
        console.log(erro);
      }

    });

  }

}