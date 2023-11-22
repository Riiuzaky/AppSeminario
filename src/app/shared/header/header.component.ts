import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './../../pages/home/home.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @ViewChild('filtroTexto') filtroTexto!: ElementRef;
  usuarioLogueado: boolean = false;
  homeComp: HomeComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.homeComp = new HomeComponent(this.changeDetectorRef);
  }



  ngOnInit(): void {
    // Verificar si hay un usuario logueado en el localStorage
    const usuarioLocalStorage = localStorage.getItem('usuario');
    if (usuarioLocalStorage) {
      this.usuarioLogueado === true;
    }
  }

  filtrarSalas(): void {
    // Aquí puedes realizar acciones adicionales, como filtrar datos o realizar una búsqueda.
    const texto = this.filtroTexto.nativeElement.value;
    this.homeComp.setSalasPrueba(texto);
  }

}
