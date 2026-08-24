import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Atleta } from '../../../models/atleta';
import { AtletaService } from '../../../services/Atleta-service/atleta.service';

@Component({
  selector: 'app-lista-atleta',
  standalone: true,
  imports: [],
  templateUrl: './lista-atleta.component.html',
  styleUrl: './lista-atleta.component.css'
})
export class ListaAtletaComponent {

  listaAtletas = signal<Atleta[]>([]);

  constructor(
    private listaService: AtletaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.listaService.listarAtletas()
      .subscribe({
        next: (dadosAtletas) => {

          this.listaAtletas.set(
            [...dadosAtletas].sort((a, b) =>
              a.nome.localeCompare(b.nome)
            )
          );

        },

        error: (msgErro) => {
          console.log('Erro ao listar Atletas ', msgErro);
        }
      });
  }

  excluir(id: number) {

    if (confirm('Deseja Excluir o Atleta?')) {

      this.listaService.excluirAtleta(id)
        .subscribe({
          next: (resposta) => {

            console.log(
              'Excluído com Sucesso!!! ',
              resposta
            );

            this.listar();
          },

          error: (msgErro) => {
            console.log(
              'Erro ao excluir Atleta ',
              msgErro
            );
          }
        });
    }
  }

  carregaDadosAtletaForm(atleta: Atleta) {
    this.router.navigate([
      '/Cadastro-Atleta',
      atleta.id
    ]);
  }

  calcularIdade(dataNascimento: Date | null): number {

    if (!dataNascimento) {
      return 0;
    }
  
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
  
    let idade = hoje.getFullYear() - nascimento.getFullYear();
  
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
  
    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();
  
    if (
      mesAtual < mesNascimento ||
      (
        mesAtual === mesNascimento &&
        diaAtual < diaNascimento
      )
    ) {
      idade--;
    }
  
    return idade;
  }


  
  }
