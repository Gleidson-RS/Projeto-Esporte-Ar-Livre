import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { MenuComponent } from './component/menu-component/menu-component.component';

import { AtletaComponent } from './component/atleta/atleta-component/atleta.component';

import { ListaAtletaComponent } from './component/atleta/lista-atleta/lista-atleta.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    AtletaComponent,
    ListaAtletaComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Projeto-Esporte-Livre';

  girada = false;

  girar(): void {
    this.girada = !this.girada;
  }

}