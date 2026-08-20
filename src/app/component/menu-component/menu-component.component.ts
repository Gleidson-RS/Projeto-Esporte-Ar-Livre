import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-component.component.html',
  styleUrl: './menu-component.component.css'
})
export class MenuComponent {

  @Output() girarTela = new EventEmitter<void>();

}