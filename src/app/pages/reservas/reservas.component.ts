import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {

  salas: WritableSignal<Recurso[]> = signal([])
  cargando = signal(false);

  reservarRecurso(idRecurso: string, idTipoRecurso: string): void {
    // Guardar en el localStorage
    localStorage.setItem('id', `${idRecurso}`);
    localStorage.setItem('idTipo', `${idTipoRecurso}`);
  }

}


interface Recurso {

  idrecurso: string,
  idtiporecursopkfk: string,
  descripcion: string,
  imagen: any

}
