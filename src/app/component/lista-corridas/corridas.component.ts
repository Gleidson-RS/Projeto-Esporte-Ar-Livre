import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Atleta } from '../../models/atleta';
import { AtletaService } from '../../servive/atleta.service';

import { CadCorrida } from '../../models/cadastro-corridas';
import { CadCorridaService } from '../../servive/cad-corrida.service';

import { CadastroCorridasComponent } from '../cadastro-corridas/cadastro-corridas.component';
import { AtletaComponent } from '../atleta-component/atleta.component';

import { signal } from '@angular/core';

@Component({
  selector: 'app-corridas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './corridas.component.html',
  styleUrl: './corridas.component.css'
})
export class CorridasComponent implements OnInit {
  
  
  //listaAtletas: Atleta[] = []
  listaCorrida = signal<CadCorrida[]>([]);
  
  constructor(
    private listaService: CadCorridaService, 
    private router: Router
    ) { }
  
  
  ngOnInit() {
    this.listarCorridas();
  }
  
  listarCorridas() {
    this.listaService.listarCorridas()
    .subscribe({
      next: (dadosCorrida) => {
        
        this.listaCorrida.set([...dadosCorrida].sort((a, b) => a.descricao.localeCompare(b.descricao)));
      },
      error: (msgErro) => {
        console.log("Erro ao listar Corrida ", msgErro);
      }
    });
  }
  
  excluir(id: number) {
    if (confirm("Deseja Excluir a corrida?")) {
      this.listaService.excluirCorrida(id)
      .subscribe({
        next: (resposta) => {
          console.log("Excluído com Sucesso!!! ", resposta);
          this.listarCorridas();
        },
        error: (msgErro) => {
          console.log("Erro ao listar corridas ", msgErro);
        }
      });
    }
  }
  
  carregaDadosCorridaForm(cadCorrida: CadCorrida) {
    this.router.navigate(['/Cadastro-Corrida/:id', cadCorrida.id]);
  }
  
 
}

