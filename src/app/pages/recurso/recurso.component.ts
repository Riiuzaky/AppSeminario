import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recurso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recurso.component.html',
  styleUrl: './recurso.component.scss'
})
export class RecursoComponent {

  constructor() {
    this.getRecurso();
  }

  recurso: WritableSignal<Recurso[]> = signal([])
  cargando = signal(false);

  async getRecurso() {

    this.cargando = signal(true);
    const id = localStorage.getItem('id');
    const idTipo = localStorage.getItem('idTipo');
    const res = await fetch(`https://back-project-johan.onrender.com/resources/${id}?idTipo=${idTipo}`);
    const resJson = await res.json();
    const conversion = resJson.data.map((value: { recurso: Recurso; }) => value.recurso);
    console.log(conversion);
    this.recurso.set(conversion);
    this.cargando = signal(false);

  }

}


interface Recurso {

  idrecurso: string,
  idtiporecursopkfk: string,
  descripcion: string,
  imagen: any

}
