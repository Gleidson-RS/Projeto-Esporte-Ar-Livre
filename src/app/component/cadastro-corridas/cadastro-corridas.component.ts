import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';

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

  // ==========================================
  // DECLARANDO ATRIBUTOS
  // ==========================================

  id = 0;
  descricao = '';
  data = '';
  distancia = 0;

  idCorrida = 0;
  editar = false;


  constructor(

    private cadCorridaService: CadCorridaService,

    private http: ActivatedRoute,

    private router: Router

  ) { }


  // ==========================================
  // EXIBIR DADOS
  // ==========================================

  exibirDados() {

    console.log(this.id);
    console.log(this.descricao);
    console.log(this.data);
    console.log(this.distancia);

  }


  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================

  ngOnInit() {

    // Pega o ID que veio pela URL

    this.idCorrida = Number(
      this.http.snapshot.paramMap.get('id')
    );


    // Se existe um ID, estamos editando

    if (this.idCorrida > 0) {

      this.carregaDados(this.idCorrida);

      this.editar = true;

    }

  }


  // ==========================================
  // LIMPAR DADOS
  // ==========================================

  limparDados() {

    this.id = 0;
    this.descricao = '';
    this.data = '';
    this.distancia = 0;

  }


  // ==========================================
  // CARREGAR DADOS DA CORRIDA
  // ==========================================

  carregaDados(idCorrida: number) {

    this.cadCorridaService.listarCorrida(idCorrida).subscribe({

      next: (dadosCorrida) => {

        this.id = dadosCorrida.id;
        this.descricao = dadosCorrida.descricao;
        this.data = dadosCorrida.data;
        this.distancia = dadosCorrida.distancia;

      },

      error: (msgErro) => {

        console.log('ERRO AO LISTAR CORRIDA ', msgErro);

      }

    });

  }


  // ==========================================
  // SALVAR CORRIDA
  // ==========================================

  salvar() {

    console.log('cadastro-corridas.component.ts');


    // Cria o objeto da corrida

    const corrida: CadCorrida = {

      id: this.id,

      descricao: this.descricao,

      data: this.data,

      distancia: this.distancia

    };


    // ==========================================
    // MODO EDIÇÃO
    // ==========================================

    if (this.editar) {

      // Usa o ID que veio pela URL

      corrida.id = this.idCorrida;


      this.cadCorridaService.alterarCorrida(corrida).subscribe({

        next: (resposta) => {

          console.log('Corrida alterada com sucesso!');

          console.log(resposta);

          // Depois que a API confirmar a alteração,
          // volta para a lista de corridas

          this.router.navigate(['/Corridas']);

        },

        error: (msgErro) => {

          console.log('Erro ao alterar corrida:');

          console.log(msgErro);

        }

      });


    // ==========================================
    // MODO CADASTRO
    // ==========================================

    } else {

      this.cadCorridaService.adicionarCorrida(corrida).subscribe({

        next: (resposta) => {

          console.log('Corrida cadastrada com sucesso!');

          console.log(resposta);

          // Limpa os campos

          this.limparDados();

          // Só navega depois que a API confirmar
          // que o cadastro foi realizado

          this.router.navigate(['/Corridas']);

        },

        error: (msgErro) => {

          console.log('Erro ao cadastrar corrida:');

          console.log(msgErro);

        }

      });

    }

  }

}