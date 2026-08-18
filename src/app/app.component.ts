import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './component/menu-component/menu-component.component';
import { AtletaComponent } from './component/atleta-component/atleta.component';
import { InscricoesComponent } from './component/inscricoes/inscricoes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, AtletaComponent, InscricoesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Projeto-Esporte-Livre';

}
