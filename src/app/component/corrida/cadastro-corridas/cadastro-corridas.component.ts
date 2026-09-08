import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CadCorridaService } from '../../../services/Corrida-service/cad-corrida.service';
import { Corrida } from '../../../models/cadastro-corridas';

@Component({
  selector: 'app-cadastro-corridas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-corridas.component.html',
  styleUrl: './cadastro-corridas.component.css'
})
export class CadastroCorridasComponent {

  idcorrida = 0;
  descricao_corrida = '';
  data_corrida = '';

  distancia_5km = false;
  distancia_10km = false;
  distancia_25km = false;

  preco = 0;

  id_Corrida = 0;
  editar = false;

  constructor(
    private cadCorridaService: CadCorridaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.id_Corrida = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (this.id_Corrida > 0) {
      this.editar = true;
      this.carregaDados(this.id_Corrida);
    }
  }

  exibirDados() {

    console.log('ID:', this.idcorrida);
    console.log('Descrição:', this.descricao_corrida);
    console.log('Data:', this.data_corrida);

    console.log('5 km:', this.distancia_5km);
    console.log('10 km:', this.distancia_10km);
    console.log('25 km:', this.distancia_25km);

    console.log('Preço:', this.preco);
  }

  limparDados() {

    this.idcorrida = 0;
    this.descricao_corrida = '';
    this.data_corrida = '';

    this.distancia_5km = false;
    this.distancia_10km = false;
    this.distancia_25km = false;

    this.preco = 0;
  }

  carregaDados(id_Corrida: number) {

    this.cadCorridaService
      .listarCorrida(id_Corrida)
      .subscribe({

        next: (dadosCorrida) => {

          this.idcorrida = dadosCorrida.idCorrida;

          this.descricao_corrida =
            dadosCorrida.descricao_corrida;

          this.data_corrida =
            dadosCorrida.data_corrida;

          this.preco =
            dadosCorrida.preco;

          // Agora são BOOLEAN
          this.distancia_5km =
            dadosCorrida.distancia_5km;

          this.distancia_10km =
            dadosCorrida.distancia_10km;

          this.distancia_25km =
            dadosCorrida.distancia_25km;
        },

        error: (msgErro) => {

          console.log(
            'ERRO AO LISTAR CORRIDA',
            msgErro
          );

        }

      });
  }

  salvar() {

    console.log(
      'cadastro-corridas.component.ts'
    );

    const corrida: Corrida = {

      idCorrida: this.idcorrida,

      descricao_corrida:
        this.descricao_corrida,

      data_corrida:
        this.data_corrida,

      preco:
        this.preco,

      // Envia TRUE ou FALSE
      distancia_5km:
        this.distancia_5km,

      distancia_10km:
        this.distancia_10km,

      distancia_25km:
        this.distancia_25km
    };

    console.log('Objeto enviado:', corrida);

    if (this.editar) {

      corrida.idCorrida =
        this.id_Corrida;

      this.cadCorridaService
        .alterarCorrida(corrida)
        .subscribe({

          next: (resposta) => {

            console.log(
              'Corrida alterada com sucesso!'
            );

            console.log(resposta);

            this.router.navigate([
              '/Corridas'
            ]);
          },

          error: (msgErro) => {

            console.log(
              'Erro ao alterar corrida:',
              msgErro
            );

          }

        });

    } else {

      this.cadCorridaService
        .adicionarCorrida(corrida)
        .subscribe({

          next: (resposta) => {

            console.log(
              'Corrida cadastrada com sucesso!'
            );

            console.log(resposta);

            this.limparDados();

            this.router.navigate([
              '/Corridas'
            ]);
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