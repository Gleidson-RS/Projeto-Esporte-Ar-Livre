import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AtletaService } from '../../../services/Atleta-service/atleta.service';
import { Atleta } from '../../../models/atleta';

@Component({
  selector: 'app-atleta',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule,],
  templateUrl: './atleta.component.html',
  styleUrl: './atleta.component.css'
})
export class AtletaComponent {

  // DECLARANDO ATRIBUTOS
  id = 0;
  nome = '';
  dataNascimento = '';
  cpf = 0;
  sexo = '';
  cep = 0;
  ruaLogradouro = '';
  bairro = '';
  cidade = '';
  uf = '';

  idAtleta = 0;
  editar = false;

  constructor(
    private atletaService: AtletaService,
    private http: ActivatedRoute,
    private router: Router
  ) { }


  // EXIBIR DADOS
  exibirDados() {
    console.log(this.id);
    console.log(this.nome);
    console.log(this.dataNascimento);
    console.log(this.cpf);
    console.log(this.sexo);
    console.log(this.cep);
    console.log(this.ruaLogradouro);
    console.log(this.bairro);
    console.log(this.cidade);
    console.log(this.uf);
  }


  ngOnInit() {

    // Pega o ID que vem pela URL
    this.idAtleta = Number(this.http.snapshot.paramMap.get('id'));

    // Se existe um ID, significa que estamos editando
    if (this.idAtleta > 0) {

      // ERRO QUE ESTAVA AQUI:
      // Você chamava carregaDados() DUAS VEZES.
      //
      // ANTES:
      // this.carregaDados(this.idAtleta)
      // this.editar = true
      // this.carregaDados(this.idAtleta)
      //
      // Isso fazia duas requisições para buscar o mesmo atleta.

      this.carregaDados(this.idAtleta);

      // Ativa o modo de edição
      this.editar = true;
    }
  }


  // LIMPAR DADOS
  limparDados() {
    this.id = 0;
    this.nome = '';
    this.dataNascimento = '';
    this.cpf = 0;
    this.sexo = '';
    this.cep = 0;
    this.ruaLogradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
  }


  // CARREGAR DADOS DO ATLETA
  carregaDados(idAtleta: number) {

    this.atletaService.listarAtleta(idAtleta).subscribe({

      next: (dadosAtleta) => {

        this.nome = dadosAtleta.nome;
        this.dataNascimento = dadosAtleta.dataNascimento;
        this.cpf = dadosAtleta.cpf;
        this.sexo = dadosAtleta.sexo;
        this.cep = dadosAtleta.cep;
        this.ruaLogradouro = dadosAtleta.ruaLogradouro;
        this.bairro = dadosAtleta.bairro;
        this.cidade = dadosAtleta.cidade;
        this.uf = dadosAtleta.uf;

      },

      error: (msgErro) => {
        console.log('ERRO AO LISTAR ATLETA ', msgErro);
      }

    });
  }


  // SALVAR ATLETA
  salvar() {

    console.log('atleta.component.ts');

    // Cria um objeto Atleta
    const atleta = new Atleta();

    // Coloca os valores dos inputs dentro do objeto
    atleta.id = this.id;
    atleta.nome = this.nome;
    atleta.dataNascimento = this.dataNascimento;
    atleta.cpf = this.cpf;
    atleta.sexo = this.sexo;
    atleta.cep = this.cep;
    atleta.ruaLogradouro = this.ruaLogradouro;
    atleta.bairro = this.bairro;
    atleta.cidade = this.cidade;
    atleta.uf = this.uf;


    // ==========================================
    // MODO EDIÇÃO
    // ==========================================

    if (this.editar) {

      // Quando estamos editando, usamos o ID
      // que veio pela URL.
      atleta.id = this.idAtleta;

      // ALTERA o atleta existente.
      this.atletaService.alterarAtleta(atleta).subscribe({

        next: (resposta) => {
          console.log('Atleta alterado com sucesso!');
          console.log(resposta);

          this.router.navigate(['/Atletas']);

        },

        error: (msgErro) => {
          console.log('Erro ao alterar atleta:');
          console.log(msgErro);
        }

      });


    // ==========================================
    // MODO CADASTRO
    // ==========================================

    } else {

      // Aqui é onde cadastramos um NOVO atleta.
      this.atletaService.adicionarAtleta(atleta).subscribe({

        next: (resposta) => {
          console.log('Atleta cadastrado com sucesso!');
          this.limparDados()
          console.log(resposta);

          // Limpa os campos depois do cadastro
          this.limparDados();
        },

        error: (msgErro) => {
          console.log('Erro ao cadastrar atleta:');
          console.log(msgErro);
        }

      });
    }


  }

}