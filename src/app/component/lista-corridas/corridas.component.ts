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
  selector: 'app-corridas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './corridas.component.html',
  styleUrl: './corridas.component.css'
})
export class CorridasComponent implements OnInit {

  cadCorridas: CadCorrida[] = [];

  constructor( private cadCorridaService: CadCorridaService ) {}

  ngOnInit(): void {

    console.log('corridas.component.ts carregado');

    this.cadCorridas = this.cadCorridaService.listarCorrida();

    console.table(this.cadCorridas);
  }

}
