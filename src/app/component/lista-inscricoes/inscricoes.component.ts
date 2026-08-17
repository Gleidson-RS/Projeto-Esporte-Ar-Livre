import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Atleta } from '../../models/atleta';
import { AtletaService } from '../../servive/atleta.service';

import { CadCorrida } from '../../models/cadastro-corridas';
import { CadCorridaService } from '../../servive/cad-corrida.service';

import { CadastroCorridasComponent } from '../cadastro-corridas/cadastro-corridas.component';
import { AtletaComponent } from '../atleta-component/atleta.component';

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

    console.log('inscricoes.component.ts')
    this.atletas = this.atletaService.listarAtleta();



  }

}

