import { Component } from '@angular/core';
import { Atleta } from '../../models/atleta';
import { AtletaService } from '../../servive/atleta.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-lista-atleta',
  standalone: true,
  imports: [],
  templateUrl: './lista-atleta.component.html',
  styleUrl: './lista-atleta.component.css'
})
export class ListaAtletaComponent {
  
  
  //listaAtletas: Atleta[] = []
  listaAtletas = signal<Atleta[]>([]);
  
  constructor(private listaService: AtletaService, private router: Router) { }
  
  
  ngOnInit() {
    this.listar();
  }
  
  listar() {
    this.listaService.listarAtletas()
    .subscribe({
      next: (dadosAtletas) => {
        //this.listaAtletas = [...dadosAtletas].sort((a, b) => a.nome.localeCompare(b.nome))
        this.listaAtletas.set([...dadosAtletas].sort((a, b) => a.nome.localeCompare(b.nome)));
      },
      error: (msgErro) => {
        console.log("Erro ao listar Atletas ", msgErro);
      }
    });
  }
  
  excluir(id: number) {
    if (confirm("Deseja Excluir o Atleta?")) {
      this.listaService.excluirAtleta(id)
      .subscribe({
        next: (resposta) => {
          console.log("Excluído com Sucesso!!! ", resposta);
          this.listar();
        },
        error: (msgErro) => {
          console.log("Erro ao listar Atletas ", msgErro);
        }
      });
    }
  }
  
  carregaDadosAtletaForm(atleta: Atleta) {
    this.router.navigate(['/cadastroAtleta', atleta.id]);
  }
  
 
}

