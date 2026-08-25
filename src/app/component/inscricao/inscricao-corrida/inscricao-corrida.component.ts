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

    // Carrega todos os atletas.
    // Quando terminar, carregarAtletas()
    // vai buscar as inscrições.
    this.carregarAtletas();

    // Carrega a lista de corridas
    this.carregarCorridas();
  }

  carregarCorrida(): void {

    this.CadCorridaService
      .listarCorrida(this.idCorrida)
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

    this.atletaService
      .listarAtletas()
      .subscribe({

        next: (dados: Atleta[]) => {

          // Guarda todos os atletas
          this.listaAtletas = dados;

          // IMPORTANTE:
          // Só procura os inscritos depois que
          // os atletas já foram carregados.
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

    this.inscricaoService
      .listarInscricoes()
      .subscribe({

        next: (inscricoes: Inscricao[]) => {

          console.log(
            'Todas as inscrições recebidas da API:',
            inscricoes
          );

          console.log(
            'ID da corrida atual:',
            this.idCorrida
          );

          // Filtra somente as inscrições
          // pertencentes à corrida atual.
          //
          // Number() é usado porque a API pode
          // retornar os IDs como string.
          const inscricoesCorrida =
            inscricoes.filter(
              inscricao =>
                Number(inscricao.idCorrida) ===
                Number(this.idCorrida)
            );

          console.log(
            'Inscrições desta corrida:',
            inscricoesCorrida
          );

          // Agora procura os atletas correspondentes
          // às inscrições encontradas.
          this.atletasInscritos =
            this.listaAtletas.filter(
              atleta =>
                inscricoesCorrida.some(
                  inscricao =>
                    Number(inscricao.idAtleta) ===
                    Number(atleta.id)
                )
            );

          console.log(
            'Atletas inscritos:',
            this.atletasInscritos
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

    this.CadCorridaService
      .listarCorridas()
      .subscribe({

        next: (dados: CadCorrida[]) => {
          this.listaCorridas = dados;
        },

        error: (erro: any) => {

          console.error(
            'Erro ao carregar corridas:',
            erro
          );

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
    // nessa corrida.
    const jaInscrito =
      this.atletasInscritos.some(
        atleta =>
          Number(atleta.id) ===
          Number(this.atletaSelecionado)
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

    // Salva a inscrição na API
    this.inscricaoService
      .adicionarInscricao(novaInscricao)
      .subscribe({

        next: () => {

          alert(
            'Atleta inscrito com sucesso!'
          );

          // Busca novamente as inscrições na API.
          // Assim a tabela é atualizada com os dados
          // realmente salvos.
          this.carregarInscritos();

          // Limpa o select
          this.atletaSelecionado = null;
        },

        error: (erro: any) => {

          console.error(
            'Erro ao realizar inscrição:',
            erro
          );

          alert(
            'Erro ao realizar inscrição.'
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

    // Busca todas as inscrições na API
    this.inscricaoService
      .listarInscricoes()
      .subscribe({

        next: (inscricoes: Inscricao[]) => {

          // Procura a inscrição desse atleta
          // dentro da corrida atual.
          const inscricao =
            inscricoes.find(
              item =>
                Number(item.idCorrida) ===
                  Number(this.idCorrida) &&
                Number(item.idAtleta) ===
                  Number(idAtleta)
            );

          // Se não encontrou a inscrição
          if (
            !inscricao ||
            inscricao.id === undefined
          ) {

            console.error(
              'Inscrição não encontrada.'
            );

            return;
          }

          // Exclui a inscrição usando o ID
          // da própria inscrição.
          this.inscricaoService
            .excluirInscricao(inscricao.id)
            .subscribe({

              next: () => {

                alert(
                  'Inscrição removida.'
                );

                // Busca novamente na API
                // para atualizar a tabela.
                this.carregarInscritos();
              },

              error: (erro: any) => {

                console.error(
                  'Erro ao excluir inscrição:',
                  erro
                );

                alert(
                  'Erro ao excluir inscrição.'
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
