import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  ActivatedRoute
} from '@angular/router';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CadCorridaService } from '../../../services/Corrida-service/cad-corrida.service';
import { CadCorrida } from '../../../models/cadastro-corridas';

@Component({
  selector: 'app-cadastro-corridas',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './cadastro-corridas.component.html',
  styleUrl: './cadastro-corridas.component.css'
})
export class CadastroCorridasComponent {

  // ==========================================
  // ATRIBUTOS
  // ==========================================

  id = 0;
  descricao = '';
  data = '';

  // Controlam se os checkboxes estão marcados
  distancia5 = false;
  distancia10 = false;
  distancia25 = false;
  preco = 0;

  idCorrida = 0;
  editar = false;


  // ==========================================
  // CONSTRUTOR
  // ==========================================

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
    console.log(this.preco);

    console.log(
      '5 km:',
      this.distancia5
    );

    console.log(
      '10 km:',
      this.distancia10
    );

    console.log(
      '25 km:',
      this.distancia25
    );
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

      this.editar = true;

      this.carregaDados(this.idCorrida);
    }
  }


  // ==========================================
  // LIMPAR DADOS
  // ==========================================

  limparDados() {

    this.id = 0;

    this.descricao = '';

    this.data = '';

    this.preco;

    // Desmarca os checkboxes
    this.distancia5 = false;
    this.distancia10 = false;
    this.distancia25 = false;
  }


  // ==========================================
  // CARREGAR DADOS DA CORRIDA
  // ==========================================

  carregaDados(idCorrida: number) {

    this.cadCorridaService
      .listarCorrida(idCorrida)
      .subscribe({

        next: (dadosCorrida) => {

          this.id = dadosCorrida.id;

          this.descricao = dadosCorrida.descricao;

          this.data = dadosCorrida.data;

          this.preco = dadosCorrida.preco;

          // Verifica quais distâncias foram cadastradas
          this.distancia5 =
            dadosCorrida.distancia5 === 5;

          this.distancia10 =
            dadosCorrida.distancia10 === 10;

          this.distancia25 =
            dadosCorrida.distancia25 === 25;
        },

        error: (msgErro) => {

          console.log(
            'ERRO AO LISTAR CORRIDA',
            msgErro
          );

        }

      });
  }


  // ==========================================
  // SALVAR CORRIDA
  // ==========================================

  salvar() {

    console.log(
      'cadastro-corridas.component.ts'
    );


    // Cria o objeto da corrida
    const corrida: CadCorrida = {

      id: this.id,

      descricao: this.descricao,

      data: this.data,

      preco: this.preco,

      // Se estiver marcado, envia o valor.
      // Se não estiver, envia 0.
      distancia5:
        this.distancia5 ? 5 : 0,

      distancia10:
        this.distancia10 ? 10 : 0,

      distancia25:
        this.distancia25 ? 25 : 0
    };


    // ==========================================
    // MODO EDIÇÃO
    // ==========================================

    if (this.editar) {

      // Mantém o ID da corrida
      corrida.id = this.idCorrida;

      this.cadCorridaService
        .alterarCorrida(corrida)
        .subscribe({

          next: (resposta) => {

            console.log(
              'Corrida alterada com sucesso!'
            );

            console.log(resposta);

            // Volta para a lista
            this.router.navigate(['/Corridas']);
          },

          error: (msgErro) => {

            console.log(
              'Erro ao alterar corrida:',
              msgErro
            );

          }

        });


    // ==========================================
    // MODO CADASTRO
    // ==========================================

    } else {

      this.cadCorridaService
        .adicionarCorrida(corrida)
        .subscribe({

          next: (resposta) => {

            console.log(
              'Corrida cadastrada com sucesso!'
            );

            console.log(resposta);

            // Limpa os campos
            this.limparDados();

            // Volta para a lista
            this.router.navigate(['/Corridas']);
          },

          error: (msgErro) => {

            console.log(
              'Erro ao cadastrar corrida:',
              msgErro
            );

          }

        });
    }
  }
}