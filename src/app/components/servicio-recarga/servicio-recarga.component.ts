import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-servicio-recarga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicio-recarga.component.html',
  styleUrl: './servicio-recarga.component.scss'
})

@Injectable({
  providedIn: 'root',
})
export class ServicioRecargaComponent {
  private recargarSubject = new Subject<void>();

  recargar$ = this.recargarSubject.asObservable();

   recargar() {
    console.log('Evento de recarga emitido');
    this.recargarSubject.next();
  }
}
