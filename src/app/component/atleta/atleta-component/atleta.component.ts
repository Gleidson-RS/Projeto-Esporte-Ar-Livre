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

  idpessoa = 0
  nome = ''
  datanascimento = ''
  peso = 0
  altura = 0
  sexo = ''

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

    console.log(this.idpessoa)
    console.log(this.nome)
    console.log(this.datanascimento)
    console.log(this.peso)
    console.log(this.altura)
    console.log(this.sexo)

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

          this.idpessoa = dadosAtleta.idpessoa;
          this.nome = dadosAtleta.nome;
          this.datanascimento = dadosAtleta.datanascimento;
          this.peso = dadosAtleta.peso;
          this.altura = dadosAtleta.altura
          this.sexo = dadosAtleta.sexo;

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
        this.idpessoa,
        this.nome,
        this.datanascimento,
        this.peso,
        this.altura,
        this.sexo,

      );


    // ==========================================
    // EDIÇÃO
    // ==========================================

    if (this.editar) {


      atleta.idpessoa = this.idAtleta;

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

    this.idpessoa = atleta.idpessoa;
    this.nome = atleta.nome;
    this.datanascimento = atleta.datanascimento;
    this.peso = atleta.peso
    this.altura = atleta.altura
    this.sexo = atleta.sexo;

  }
}
