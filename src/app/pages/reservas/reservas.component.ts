import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent implements OnInit {

  salas: WritableSignal<Recurso[]> = signal([])
  cargando = signal(false);

  ngOnInit(): void {

    this.getSalas();

  }

  
  reservarRecurso(idRecurso: string, idTipoRecurso: string): void {
    // Guardar en el localStorage
    localStorage.setItem('id', `${idRecurso}`);
    localStorage.setItem('idTipo', `${idTipoRecurso}`);
  }

  async getSalas() {
    this.cargando = signal(true);
    const token = localStorage.getItem('token') || '';
    const res = await fetch("https://back-project-johan.onrender.com/resources",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });
    const resJson = await res.json();
    const conversion = resJson.data.map((value: { recurso: Recurso; }) => value.recurso);
    this.salas.set(conversion);
    this.cargando = signal(false);
  }




}


interface Recurso {

  idrecurso: string,
  idtiporecursopkfk: string,
  descripcion: string,
  imagen: any

}
