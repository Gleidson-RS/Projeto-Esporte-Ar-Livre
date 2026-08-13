import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [],
  templateUrl: './menu-component.component.html',
  styleUrl: './menu-component.component.css'
})
export class MenuComponent {


















  girada = false;

  girarPagina() {
    this.girada = !this.girada;
  }
  
}
