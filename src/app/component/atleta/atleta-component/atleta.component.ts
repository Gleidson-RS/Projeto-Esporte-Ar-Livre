import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AtletaService } from '../../../services/Atleta-service/atleta.service';

@Component({
  selector: 'app-atleta',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './atleta.component.html',
  styleUrl: './atleta.component.css'
})
export class AtletaComponent {

  // ==========================================
  // DADOS DO ATLETA
  // ==========================================

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

  // ==========================================
  // CONTROLE DA TELA
  // ==========================================

  idAtleta = 0;
  editar = false;


  constructor(
    private atletaService: AtletaService,
    private http: ActivatedRoute,
    private router: Router
  ) { }


  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================

  ngOnInit() {


    this.idAtleta = Number(
        this.http.snapshot.paramMap.get('id')
      );

    if (this.idAtleta > 0) {

      this.editar = true;

      this.carregaDados(
        this.idAtleta
      );
    }
  }


  // ==========================================
  // EXIBIR DADOS
  // ==========================================

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


  // ==========================================
  // CARREGAR DADOS
  // ==========================================

  carregaDados(
    idAtleta: number
  ) {

    this.atletaService
      .listarAtleta(idAtleta)
      .subscribe({
        next: (dadosAtleta) => {

          this.id = dadosAtleta.id;
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

          console.log(
            'ERRO AO LISTAR ATLETA ',
            msgErro
          );
        }
      });
  }


  // ==========================================
  // SALVAR
  // ==========================================

  salvar() {

    // ==========================================
    // CRIA O OBJETO ATLETA
    // ==========================================

    const atleta =
      this.atletaService.criarAtleta(
        this.id,
        this.nome,
        this.dataNascimento,
        this.cpf,
        this.sexo,
        this.cep,
        this.ruaLogradouro,
        this.bairro,
        this.cidade,
        this.uf
      );


    // ==========================================
    // EDIÇÃO
    // ==========================================

    if (this.editar) {


      atleta.id = this.idAtleta;

      this.atletaService
        .alterarAtleta(atleta)
        .subscribe({

          next: (resposta) => {

            console.log(
              'Atleta alterado com sucesso!'
            );

            console.log(resposta);

            this.router.navigate([
              '/Atletas'
            ]);
          },

          error: (msgErro) => {

            console.log(
              'Erro ao alterar atleta:',
              msgErro
            );
          }
        });

      return;
    }


    // ==========================================
    // NOVO CADASTRO
    // ==========================================

    this.atletaService
      .adicionarAtleta(atleta)
      .subscribe({

        next: (resposta) => {

          console.log(
            'Atleta cadastrado com sucesso!'
          );

          console.log(resposta);

          this.limparDados();
        },

        error: (msgErro) => {

          console.log(
            'Erro ao cadastrar atleta:',
            msgErro
          );
        }
      });
  }


  // ==========================================
  // LIMPAR DADOS
  // ==========================================

  limparDados() {

    const atleta =
      this.atletaService.limparAtleta();

    this.id = atleta.id;
    this.nome = atleta.nome;
    this.dataNascimento = atleta.dataNascimento;
    this.cpf = atleta.cpf;
    this.sexo = atleta.sexo;
    this.cep = atleta.cep;
    this.ruaLogradouro = atleta.ruaLogradouro;
    this.bairro = atleta.bairro;
    this.cidade = atleta.cidade;
    this.uf = atleta.uf;
  }
}
