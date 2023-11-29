import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ServiceAuthComponent } from '../../components/service-auth/service-auth.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @ViewChild('filtroTexto') filtroTexto!: ElementRef;
  private authSubscription!: Subscription;

  constructor(private authService: ServiceAuthComponent) {
    
  }

  get usuarioLogueado(): boolean {
    return this.authService.obtenerEstadoAutenticacion();
  }


  ngOnInit(): void {
    
  }

  filtrarSalas(): void {
    // Aquí puedes realizar acciones adicionales, como filtrar datos o realizar una búsqueda.
    const texto = this.filtroTexto.nativeElement.value;
  }

}
