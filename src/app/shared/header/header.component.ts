import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  usuarioLogueado: boolean = false;


  ngOnInit(): void {
    // Verificar si hay un usuario logueado en el localStorage
    const usuarioLocalStorage = localStorage.getItem('usuario');
    if(usuarioLocalStorage){
      this.usuarioLogueado === true;
    } 
  }



}
