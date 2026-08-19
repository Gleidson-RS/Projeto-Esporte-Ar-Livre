import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';

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

  idAtleta = 0;

  constructor(

    private atletaService:AtletaService, 
    private http: ActivatedRoute

     ) { }


  // EXIBIR DADOS
  exibirDados() {
    console.log(this.id);
    console.log(this.nome);
    console.log(this.cpf);
    console.log(this.sexo);
    console.log(this.cep);
    console.log(this.ruaLogradouro);
    console.log(this.bairro);
    console.log(this.cidade);
    console.log(this.uf);
  }

  ngOnInit(){
    this.idAtleta = Number(this.http.snapshot.paramMap.get('id'))

    if(this.idAtleta > 0){
      this.carregaDados(this.idAtleta)
    }
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

  carregaDados(idAtleta: number){
    this.atletaService.listarAtleta(idAtleta).subscribe({
      next:(dadosAtleta) => {

        this.nome = dadosAtleta.nome
        this.cpf = dadosAtleta.cpf
        this.sexo = dadosAtleta.sexo
        this.cep = dadosAtleta.cep
        this.ruaLogradouro = dadosAtleta.ruaLogradouro
        this.bairro = dadosAtleta.bairro
        this.cidade = dadosAtleta.cidade
        this.uf = dadosAtleta.uf

      },
      error:(msgErro)=>{
        console.log( 'ERRO AO LISTAR ATLETA ', msgErro)
      }
     })
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
        console.log('cuidado pra não virar o barco de teseu kkkkkkkkkk')
      }

    });

  }

}
