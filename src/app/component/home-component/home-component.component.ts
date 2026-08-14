import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  standalone: true,
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponent {












  
  girada = false;

  girar(): void {
    this.girada = !this.girada;
  }

}