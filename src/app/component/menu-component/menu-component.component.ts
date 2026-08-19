import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-component.component.html',
  styleUrl: './menu-component.component.css'
})
export class MenuComponent {

















 
  girada = false;

  girar(): void {
    this.girada = !this.girada;
    console.log('cuidado pra não virar o barco de teseu kkkkkkkkkk')
  }

}
