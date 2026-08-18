import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Atleta } from '../../models/atleta';
import { AtletaService } from '../../servive/atleta.service';

@Component({
  selector: 'app-inscricoes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './inscricoes.component.html',
  styleUrl: './inscricoes.component.css'
})
export class InscricoesComponent implements OnInit {

  atletas: Atleta[] = [];

  constructor(private atletaService: AtletaService) {}

  ngOnInit(): void {

    this.atletaService.listarAtleta().subscribe({
      next: (dadosAtletas: Atleta[]) => {
        this.atletas = dadosAtletas;
      },

      error: (erro: any) => {
        console.log(erro);
      }
    });

  }

}