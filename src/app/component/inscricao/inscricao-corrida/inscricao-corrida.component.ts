import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Atleta } from '../../../models/atleta';
import { CadCorrida } from '../../../models/cadastro-corridas';
import { Inscricao } from '../../../models/inscricao';

import { AtletaService } from '../../../services/Atleta-service/atleta.service';
import { CadCorridaService } from '../../../services/Corrida-service/cad-corrida.service';
import { InscricaoService } from '../../../services/Inscricao-service/inscricao.service';

@Component({
  selector: 'app-inscricao-corrida',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inscricao-corrida.component.html',
  styleUrl: './inscricao-corrida.component.css'
})
export class InscricaoCorridaComponent implements OnInit {

  // Corrida selecionada
  cadCorrida?: CadCorrida;

  // Lista de todas as corridas
  listaCorridas: CadCorrida[] = [];

  // Lista de todos os atletas
  listaAtletas: Atleta[] = [];

  // Lista dos atletas inscritos nessa corrida
  atletasInscritos: Atleta[] = [];

  // Atleta selecionado
  atletaSelecionado: number | null = null;

  // ID da corrida
  idCorrida!: number;


  constructor(
    private route: ActivatedRoute,
    private atletaService: AtletaService,
    private CadCorridaService: CadCorridaService,
    private inscricaoService: InscricaoService
  ) {}


  ngOnInit(): void {

    // Pega o ID da corrida pela URL
    this.idCorrida = Number(
      this.route.snapshot.paramMap.get('id')
    );

    // Carrega os dados da corrida
    this.carregarCorrida();

    // Carrega todos os atletas
    this.carregarAtletas();

    // Carrega os atletas inscritos
    this.carregarInscritos();

    this.carregarCorridas();


  }


  carregarCorrida(): void {

    this.CadCorridaService.listarCorrida(this.idCorrida)
      .subscribe({
        next: (dados: CadCorrida) => {

          this.cadCorrida = dados;

        },

        error: (erro: any) => {

          console.error(
            'Erro ao carregar corrida:',
            erro
          );

        }
      });

  }


  carregarAtletas(): void {

    this.atletaService.listarAtletas()
      .subscribe({
        next: (dados: Atleta[]) => {

          this.listaAtletas = dados;

          // Depois que os atletas foram carregados,
          // atualiza a lista de inscritos
          this.carregarInscritos();

        },

        error: (erro: any) => {

          console.error(
            'Erro ao carregar atletas:',
            erro
          );

        }
      });

  }


  carregarInscritos(): void {

    this.inscricaoService.listarInscricoes()
      .subscribe({
        next: (inscricoes: Inscricao[]) => {

          // Pega somente as inscrições dessa corrida
          const inscricoesCorrida = inscricoes.filter(
            inscricao =>
              inscricao.idCorrida === this.idCorrida
          );


          // Procura os atletas correspondentes
          this.atletasInscritos =
            this.listaAtletas.filter(
              atleta =>
                inscricoesCorrida.some(
                  inscricao =>
                    inscricao.idAtleta === atleta.id
                )
            );

        },

        error: (erro: any) => {

          console.error(
            'Erro ao carregar inscrições:',
            erro
          );

        }
      });

  }

  carregarCorridas(): void {
    this.CadCorridaService.listarCorridas()
      .subscribe({
        next: (dados: CadCorrida[]) => {
          this.listaCorridas = dados;
        },
        error: (erro: any) => {
          console.error('Erro ao carregar corridas:', erro);
        }
      });
  }
  


  inscrever(): void {

    // Verifica se algum atleta foi selecionado
    if (this.atletaSelecionado === null) {

      alert('Selecione um atleta.');

      return;
    }


    // Verifica se o atleta já está inscrito
    const jaInscrito =
      this.atletasInscritos.some(
        atleta =>
          atleta.id === this.atletaSelecionado
      );


    if (jaInscrito) {

      alert(
        'Esse atleta já está inscrito nessa corrida.'
      );

      return;
    }


    // Cria a nova inscrição
    const novaInscricao: Inscricao = {

      idCorrida: this.idCorrida,

      idAtleta: this.atletaSelecionado

    };


    // Salva a inscrição
    this.inscricaoService
      .adicionarInscricao(novaInscricao)
      .subscribe({

        next: () => {

          alert(
            'Atleta inscrito com sucesso!'
          );

          // Atualiza a lista
          this.carregarInscritos();

          // Limpa o select
          this.atletaSelecionado = null;

        },

        error: (erro: any) => {

          console.error(
            'Erro ao realizar inscrição:',
            erro
          );

        }

      });

  }


  excluirInscricao(
    idAtleta: number | undefined
  ): void {

    // Verifica se existe um ID
    if (idAtleta === undefined) {

      return;

    }


    // Busca todas as inscrições
    this.inscricaoService
      .listarInscricoes()
      .subscribe({

        next: (inscricoes: Inscricao[]) => {

          // Procura a inscrição desse atleta
          // nessa corrida
          const inscricao =
            inscricoes.find(

              item =>
                item.idCorrida === this.idCorrida &&
                item.idAtleta === idAtleta

            );


          // Se não encontrou a inscrição
          if (
            !inscricao ||
            inscricao.id === undefined
          ) {

            return;

          }


          // Exclui a inscrição
          this.inscricaoService
            .excluirInscricao(inscricao.id)
            .subscribe({

              next: () => {

                alert(
                  'Inscrição removida.'
                );

                // Atualiza a lista
                this.carregarInscritos();

              },

              error: (erro: any) => {

                console.error(
                  'Erro ao excluir inscrição:',
                  erro
                );

              }

            });

        },

        error: (erro: any) => {

          console.error(
            'Erro ao buscar inscrições:',
            erro
          );

        }

      });

  }

}